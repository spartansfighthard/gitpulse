# GitPulse

GitPulse is a privacy-focused GitHub analytics platform built with Next.js and Solana. Monitor your repositories and get insights while keeping your data private - all processing happens client-side.

## Features

- 🔒 Privacy-First: All data processing happens in your browser
- 🔄 Real-time GitHub Analytics
- 💳 Solana-based Subscriptions
- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark Mode Support

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Yarn package manager
- Phantom Wallet (for Solana transactions)

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js, Phantom Wallet
- **State Management**: React Query
- **Database**: Prisma (for subscription tracking)

## Architecture

GitPulse is designed as a client-side application that:
- Uses local browser storage only when necessary
- Processes all data locally on your device
- Makes direct API calls to GitHub without intermediary servers
- Maintains zero persistent storage on our end

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:
1. Check our [FAQ](docs/FAQ.md)
2. Open an issue
3. Join our community discussions

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Solana](https://solana.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)