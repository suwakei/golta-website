export const HomeContent = `
# Golta: The blazing-fast Go version manager

**A fast, cross-platform Go version manager with Volta-style seamless switching.**

Golta is a command-line tool that allows you to easily install and switch between different versions of Go. It's designed to be fast, reliable, and easy to use.

## Key Features

*   **Cross-Platform:** Works on macOS, Linux, and Windows.
*   **Fast Installation:** Installs Go versions quickly.
*   **Seamless Switching:** Automatically switches Go versions based on your project's configuration.
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

export const referenceContent = `
# Golta Command Reference

This page provides a detailed reference for all available \`golta\` commands.

## \`golta install\`

Installs a specific version of Go.

\`\`\`bash
golta install <version>
\`\`\`

## \`golta use\`

Switches the Go version for the current shell session.

\`\`\`bash
golta use <version>
\`\`\`
`;
