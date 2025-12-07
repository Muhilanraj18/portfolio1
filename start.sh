#!/bin/bash

# 3D Dev Portfolio - Quick Start Script

echo "🌌 3D Developer Portfolio Setup"
echo "================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting development server..."
echo ""
echo "Your portfolio will be available at:"
echo "👉 http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
