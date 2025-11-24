#!/usr/bin/env sh

set -e

GOLTA_VERSION="${GOLTA_VERSION:-latest}"
GOLTA_HOME="${HOME}/.golta"
BIN_DIR="${GOLTA_HOME}/bin"
REPO="yourname/golta"
API_URL="https://api.github.com/repos/${REPO}/releases"
RELEASE_URL="https://github.com/${REPO}/releases"

info()   { printf "  [INFO]  %s\n" "$1"; }
error()  { printf "  [ERROR] %s\n" "$1" >&2; exit 1; }
success(){ printf "  [ OK ]  %s\n" "$1"; }

###############################################################################
# Detect platform
###############################################################################
detect_platform() {
    case "$(uname -s)" in
        Darwin) OS="apple-darwin" ;;
        Linux)  OS="unknown-linux-gnu" ;;
        *) error "Unsupported OS: $(uname -s)" ;;
    esac

    case "$(uname -m)" in
        x86_64|amd64) ARCH="x86_64" ;;
        arm64|aarch64) ARCH="aarch64" ;;
        *) error "Unsupported architecture: $(uname -m)" ;;
    esac

    PLATFORM="${ARCH}-${OS}"
}

###############################################################################
# Download utility
###############################################################################
download() {
    URL="$1"
    DEST="$2"

    if command -v curl >/dev/null 2>&1; then
        curl -fsSL "$URL" -o "$DEST"
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$URL" -O "$DEST"
    else
        error "Neither curl nor wget found."
    fi
}

###############################################################################
# Extract archive
###############################################################################
extract() {
    ARCHIVE="$1"
    DEST="$2"

    mkdir -p "$DEST"
    tar -xzf "$ARCHIVE" -C "$DEST"
}

###############################################################################
# Resolve version (tag)
###############################################################################
resolve_version() {
    if [ "$GOLTA_VERSION" = "latest" ]; then
        TAG=$(curl -fsSL "${API_URL}/latest" | grep '"tag_name"' | cut -d '"' -f4)
    else
        TAG="$GOLTA_VERSION"
    fi

    [ -z "$TAG" ] && error "Could not detect Golta version."

    VERSION="$TAG"
    info "Using version: $VERSION"
}

###############################################################################
# Install logic
###############################################################################
install_golta() {
    detect_platform
    resolve_version

    mkdir -p "$BIN_DIR"

    FILE="golta-${PLATFORM}.tar.gz"
    URL="${RELEASE_URL}/download/${VERSION}/${FILE}"

    TMPDIR=$(mktemp -d 2>/dev/null || mktemp -d -t golta)
    ARCHIVE="${TMPDIR}/${FILE}"

    info "Downloading $URL"
    download "$URL" "$ARCHIVE"

    info "Extracting..."
    extract "$ARCHIVE" "$TMPDIR"

    # Extracted files expected:
    #   golta
    #   golta-shim
    if [ ! -f "${TMPDIR}/golta" ]; then
        error "Archive structure invalid: 'golta' not found. Check your tar.gz contents."
    fi

    mv "${TMPDIR}/golta" "$BIN_DIR/golta"
    chmod +x "$BIN_DIR/golta"

    mv "${TMPDIR}/golta-shim" "$BIN_DIR/go"
    chmod +x "$BIN_DIR/go"

    mkdir -p "${GOLTA_HOME}/versions"
    mkdir -p "${GOLTA_HOME}/state"

    rm -rf "$TMPDIR"

    success "Golta installed."
}

###############################################################################
# PATH setup
###############################################################################
setup_path() {
    case ":$PATH:" in
        *":${BIN_DIR}:"*)
            success "PATH already configured."
            return
            ;;
    esac

    if [ -n "$ZSH_VERSION" ]; then
        SHELL_RC="$HOME/.zshrc"
    elif [ -n "$BASH_VERSION" ]; then
        SHELL_RC="$HOME/.bashrc"
    else
        SHELL_RC="$HOME/.profile"
    fi

    info "Adding Golta to PATH in $SHELL_RC"

    {
        printf "\n# Added by Golta installer\n"
        printf "export PATH=\"%s:\$PATH\"\n" "$BIN_DIR"
    } >> "$SHELL_RC"

    success "PATH updated. Restart terminal or run:  source ${SHELL_RC}"
}

###############################################################################
# Run
###############################################################################
install_golta
setup_path
success "Golta setup complete."
