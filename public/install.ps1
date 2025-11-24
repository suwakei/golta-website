#!/usr/bin/env pwsh
# Requires PowerShell 5+ / PowerShell 7+

$ErrorActionPreference = "Stop"

$GOLTA_VERSION = if ($env:GOLTA_VERSION) { $env:GOLTA_VERSION } else { "latest" }
$GOLTA_HOME    = Join-Path $env:USERPROFILE ".golta"
$BIN_DIR       = Join-Path $GOLTA_HOME "bin"
$REPO          = "yourname/golta"
$API_URL       = "https://api.github.com/repos/$REPO/releases"
$RELEASE_URL   = "https://github.com/$REPO/releases"

function Info($msg)    { Write-Host "  [INFO]  $msg" }
function ErrorStop($m) { Write-Host "  [ERROR] $m"; exit 1 }
function Success($m)   { Write-Host "  [ OK ]  $m" }

###############################################################################
# Detect platform (Windows → x86_64-pc-windows-msvc 等)
###############################################################################
function Detect-Platform {
    if ($env:PROCESSOR_ARCHITECTURE -eq "AMD64") {
        $ARCH = "x86_64"
    } elseif ($env:PROCESSOR_ARCHITECTURE -match "ARM") {
        $ARCH = "aarch64"
    } else {
        ErrorStop "Unsupported architecture: $env:PROCESSOR_ARCHITECTURE"
    }

    # Rust target triple と合わせる前提
    $OS = "pc-windows-msvc"

    $GLOBALS:PLATFORM = "$ARCH-$OS"
}

###############################################################################
# Resolve version (tag)
###############################################################################
function Resolve-Version {
    if ($GOLTA_VERSION -eq "latest") {
        try {
            $json = Invoke-RestMethod "$API_URL/latest"
            $GLOBALS:VERSION = $json.tag_name
        } catch {
            ErrorStop "Failed to fetch latest release version."
        }
    } else {
        $GLOBALS:VERSION = $GOLTA_VERSION
    }

    if (-not $VERSION) {
        ErrorStop "Could not resolve Golta version."
    }

    Info "Using version: $VERSION"
}

###############################################################################
# Download file
###############################################################################
function Download($url, $dest) {
    Info "Downloading $url"
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
    } catch {
        ErrorStop "Download failed: $url"
    }
}

###############################################################################
# Main installation
###############################################################################
function Install-Golta {
    Detect-Platform
    Resolve-Version

    New-Item -ItemType Directory -Force -Path $BIN_DIR | Out-Null

    $file = "golta-$PLATFORM.zip"
    $url  = "$RELEASE_URL/download/$VERSION/$file"

    $tmp = New-TemporaryFile
    $tmpzip = $tmp.FullName + ".zip"
    Rename-Item $tmp.FullName $tmpzip

    Download $url $tmpzip

    $tmpdir = Join-Path $env:TEMP ("golta_" + [guid]::NewGuid().ToString())
    New-Item -ItemType Directory -Force -Path $tmpdir | Out-Null

    Info "Extracting..."
    Expand-Archive -LiteralPath $tmpzip -DestinationPath $tmpdir -Force

    $goltaExe = Join-Path $tmpdir "golta.exe"
    $shimExe  = Join-Path $tmpdir "golta-shim.exe"

    if (-not (Test-Path $goltaExe)) {
        ErrorStop "Invalid archive structure: golta.exe not found."
    }

    Move-Item $goltaExe (Join-Path $BIN_DIR "golta.exe") -Force
    Move-Item $shimExe  (Join-Path $BIN_DIR "go.exe") -Force

    Remove-Item $tmpzip -Force
    Remove-Item $tmpdir -Recurse -Force

    Success "Golta installed."
}

###############################################################################
# PATH setup
###############################################################################
function Setup-Path {
    $current = [Environment]::GetEnvironmentVariable("PATH", "User")

    if ($current -and $current -match [Regex]::Escape($BIN_DIR)) {
        Success "PATH already configured."
        return
    }

    Info "Adding Golta to PATH (User Environment)"

    $newpath = "$BIN_DIR;$current"
    [Environment]::SetEnvironmentVariable("PATH", $newpath, "User")

    Success "PATH updated. Restart PowerShell to apply changes."
}

###############################################################################
# Run
###############################################################################
Install-Golta
Setup-Path
Success "Golta setup complete."
