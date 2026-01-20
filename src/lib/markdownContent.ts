export const HomeContent = `
# Golta: The blazing-fast Go version manager

**A fast, cross-platform Go version manager with Volta-style seamless switching.**

Golta is a command-line tool that allows you to easily install and switch between different versions of Go. It's designed to be fast, reliable, and easy to use.

## Key Features

*   **Cross-Platform:** Works on macOS, Linux, and Windows.
*   **Fast Installation:** Installs Go versions quickly.
*   **Seamless Switching:** Automatically switches Go versions based on your project's configuration.

## Installation

### macOS / Linux

You can install Golta using the installer script:

\`\`\`bash
curl -fsSL https://golta-website.vercel.app/install | bash
\`\`\`

### Windows
Run the following command in PowerShell:
\`\`\`powershell
iwr -useb https://golta-website.vercel.app/install_win | iex
\`\`\`

__※Note: After installation, restart your terminal to start using golta.__


## Usage
Installing Go
To install the latest version of Go:
\`\`\`shell
golta install go
\`\`\`
Or to install a specific version (e.g., latest):

\`\`\`shell
golta install go@latest
\`\`\`

## Running a Project
Use the go command as usual, and Golta will run it with the appropriate version based on your configuration:

\`\`\`shell
go version
\`\`\`

\`\`\`shell
go version go1.25.4 windows/amd64
\`\`\`

\`\`\`shell
go run main.go
\`\`\`
`;

export const guideContent = `
# Golta Guide

Welcome to the official guide for Golta! This document will walk you through the installation and basic usage.

## Installation

To get started, you can install Golta using the following command in your terminal.

\`\`\`bash
curl -sSfL https://raw.githubusercontent.com/suwakei/golta/main/install.sh | sh
\`\`\`

## Basic Usage

Here are some of the basic commands:

*   \`golta install <version>\`: Install a specific version of Go.
*   \`golta use <version>\`: Switch to a specific version of Go for the current shell session.
*   \`golta list\`: List all installed Go versions.
`;

export const referenceInstallContent = `
# golta install

**Usage**: golta install [TOOL] (Aliases: i, fetch)

**Description**: Downloads and installs a specific version of a tool (e.g., go@1.23.0).
If the tool argument is omitted, it defaults to go.

**Example**
\`\`\`bash
golta install go@1.23.0
\`\`\`
`;

export const referenceUninstallContent = `
# golta uninstall 

**Usage**: golta uninstall <TOOL> (Aliases: un, uni)

**Description**: Uninstalls a specific version of a tool to free up disk space.
If the version being uninstalled is currently the global default,
the default setting is cleared.

**Example**
\`\`\`bash
golta uninstall go@1.23.0
\`\`\`
`;

export const referenceListContent = `
# golta list

**Usage**: golta list (Alias: ls)

**Description**: Lists all tool versions currently installed on the local machine.
It marks the currently active version,
the global default, and the pinned version (if applicable).

**Example**
\`\`\`bash
golta list
\`\`\`
`;

export const referenceListRemoteContent = `
# golta list-remote

**Usage**: golta list-remote (Alias: ls-remote)

**Description**: Lists available Go versions from go.dev that are available for installation.

**Example**
\`\`\`bash
golta list-remote
\`\`\`
`;

export const referenceDefaultContent = `
# golta default

**Usage**: golta default <TOOL> or golta default clear (Alias: df)

**Description**: Sets the global default version to be used when no project-specific version is pinned.
Use the clear subcommand to remove the global default setting.

**Example**
\`\`\`bash
golta default go@1.23.0
\`\`\`
`;

export const referencePinContent = `
# golta pin

**Usage**: golta pin <TOOL>

**Description**: Pins a specific tool version to the current project directory by creating or updating a .golta.json file.
By default, it also attempts to update the go directive in the go.mod file if it exists.

**Example**
\`\`\`bash
golta pin go@1.23.0
\`\`\`
`;

export const referenceUnpinContent = `
# golta unpin

**Usage**: golta unpin

**Description**: 
Removes the pinned version configuration from the current project directory. 
This deletes the .golta.json file if it exists, 
causing the directory to revert to using the global default version.

**Example**
\`\`\`bash
golta unpin
\`\`\`
`;

export const referenceExecContent = `
# golta exec

**Usage**: golta exec <TOOL> [ARGS]...

**Description**:
Executes an arbitrary command using the currently active tool version.
The active version is determined by the project's pinned version (if present) or the global default.

**Example**
\`\`\`bash
golta exec go version
\`\`\`
`;

export const referenceRunContent = `
# golta run

**Usage**: golta run <TOOL> [ARGS]...

**Description**: Runs a command using a specific tool version for a one-time execution,
ignoring the current project pin or global default.
This is useful for testing with a different version without changing your configuration.

**Example**
\`\`\`bash
golta run go@1.23.0 go test ./...
\`\`\`
`;

export const referenceWhichContent = `
# golta which

**Usage**: golta which <TOOL>

**Description**: Displays the full absolute path to the executable of the currently active tool version.

**Example**
\`\`\`bash
golta which go
\`\`\`  
`;

export const referenceContent = `
# Golta Command Reference

This page provides a detailed reference for all available \`golta\` commands.

${referenceInstallContent}
${referenceUninstallContent}
${referenceListContent}
${referenceListRemoteContent}
${referenceDefaultContent}
${referencePinContent}
${referenceUnpinContent}
${referenceExecContent}
${referenceRunContent}
${referenceWhichContent}
`;
