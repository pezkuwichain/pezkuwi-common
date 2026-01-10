#!/bin/bash

# Pezkuwi Common Rebrand Script
# Converts @pezkuwi/* packages to @pezkuwi/*

set -e

echo "🔄 Starting Pezkuwi Common rebrand..."

# 1. Update all package.json files
echo "📦 Updating package.json files..."
find . -type f -name "package.json" -not -path "*/node_modules/*" -exec sed -i 's/@pezkuwi/@pezkuwi/g' {} +
find . -type f -name "package.json" -not -path "*/node_modules/*" -exec sed -i 's/polkadot-js\/common/pezkuwichain\/pezkuwi-common/g' {} +
find . -type f -name "package.json" -not -path "*/node_modules/*" -exec sed -i 's/polkadot-js/pezkuwi/g' {} +

# 2. Update TypeScript imports
echo "📝 Updating TypeScript imports..."
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -not -path "*/build/*" -exec sed -i 's/from "@pezkuwi/from "@pezkuwi/g' {} +
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -not -path "*/build/*" -exec sed -i "s/from '@pezkuwi/from '@pezkuwi/g" {} +
find . -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules/*" -not -path "*/build/*" -exec sed -i 's/import("@pezkuwi/import("@pezkuwi/g' {} +

# 3. Update JavaScript files
echo "📜 Updating JavaScript files..."
find . -type f \( -name "*.js" -o -name "*.cjs" -o -name "*.mjs" \) -not -path "*/node_modules/*" -not -path "*/build/*" -exec sed -i 's/from "@pezkuwi/from "@pezkuwi/g' {} +
find . -type f \( -name "*.js" -o -name "*.cjs" -o -name "*.mjs" \) -not -path "*/node_modules/*" -not -path "*/build/*" -exec sed -i "s/from '@pezkuwi/from '@pezkuwi/g" {} +

# 4. Update README and docs
echo "📚 Updating documentation..."
find . -type f -name "*.md" -not -path "*/node_modules/*" -exec sed -i 's/@pezkuwi/@pezkuwi/g' {} +
find . -type f -name "*.md" -not -path "*/node_modules/*" -exec sed -i 's/polkadot-js\/common/pezkuwichain\/pezkuwi-common/g' {} +
find . -type f -name "*.md" -not -path "*/node_modules/*" -exec sed -i 's/polkadot\.js/pezkuwi.js/g' {} +
find . -type f -name "*.md" -not -path "*/node_modules/*" -exec sed -i 's/Polkadot\.js/Pezkuwi.js/g' {} +
find . -type f -name "*.md" -not -path "*/node_modules/*" -exec sed -i 's/Polkadot/Pezkuwi/g' {} +

# 5. Update config files
echo "⚙️  Updating config files..."
sed -i 's/@pezkuwi/@pezkuwi/g' tsconfig*.json 2>/dev/null || true
sed -i 's/@pezkuwi/@pezkuwi/g' eslint.config.js 2>/dev/null || true
sed -i 's/@pezkuwi/@pezkuwi/g' rollup.config.js 2>/dev/null || true

# 6. Update GitHub workflows
echo "🔧 Updating GitHub workflows..."
find .github -type f -name "*.yml" -exec sed -i 's/polkadot-js\/common/pezkuwichain\/pezkuwi-common/g' {} + 2>/dev/null || true

# 7. Update author info
echo "👤 Updating author info..."
sed -i 's/"author": "Jaco Greeff.*"/"author": "Pezkuwi Team <team@pezkuwichain.app>"/g' package.json
sed -i 's/"homepage":.*/"homepage": "https:\/\/github.com\/pezkuwichain\/pezkuwi-common#readme",/g' package.json

echo "✅ Rebrand complete!"
echo ""
echo "📊 Summary:"
echo "  - Package namespace: @pezkuwi → @pezkuwi"
echo "  - Repository: polkadot-js/common → pezkuwichain/pezkuwi-common"
echo "  - Packages: 14 (util, util-crypto, keyring, networks, + 10 helpers)"
echo ""
echo "Next steps:"
echo "  1. Review: git diff"
echo "  2. Commit: git add . && git commit -m 'Rebrand to Pezkuwi Common'"
echo "  3. Create GitHub repo and push"
