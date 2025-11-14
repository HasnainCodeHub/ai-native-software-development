#!/bin/bash

# ========================================
# Push to New Repository Script
# ========================================
# This script helps push your code to a new GitHub repository
# while ensuring node_modules is properly ignored

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}  Push to New Repository${NC}"
echo -e "${BLUE}================================${NC}"
echo ""

# Step 1: Check if in git repository
if [ ! -d .git ]; then
    echo -e "${RED}❌ Error: Not a git repository${NC}"
    echo "Run: git init"
    exit 1
fi

echo -e "${GREEN}✅ Git repository detected${NC}"
echo ""

# Step 2: Get new repository URL
echo -e "${YELLOW}Enter your new GitHub repository URL:${NC}"
echo -e "${BLUE}Example: https://github.com/username/repo-name.git${NC}"
read -p "URL: " NEW_REPO_URL

if [ -z "$NEW_REPO_URL" ]; then
    echo -e "${RED}❌ Error: Repository URL cannot be empty${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Repository URL: ${NEW_REPO_URL}${NC}"
echo ""

# Step 3: Check .gitignore exists and has node_modules
echo -e "${YELLOW}Checking .gitignore...${NC}"

if [ ! -f .gitignore ]; then
    echo -e "${YELLOW}⚠️  .gitignore not found, creating one...${NC}"
    cat > .gitignore << 'EOF'
# Dependencies
/node_modules
book-source/node_modules

# Production
/build

# Generated files
.docusaurus
.cache-loader

# Misc
.DS_Store
.env*
npm-debug.log*
yarn-debug.log*
yarn-error.log*
EOF
    echo -e "${GREEN}✅ Created .gitignore${NC}"
else
    # Check if node_modules is in .gitignore
    if grep -q "node_modules" .gitignore; then
        echo -e "${GREEN}✅ node_modules is in .gitignore${NC}"
    else
        echo -e "${YELLOW}⚠️  Adding node_modules to .gitignore...${NC}"
        echo "/node_modules" >> .gitignore
        echo "book-source/node_modules" >> .gitignore
        echo -e "${GREEN}✅ Updated .gitignore${NC}"
    fi
fi

echo ""

# Step 4: Remove node_modules from tracking if present
echo -e "${YELLOW}Checking if node_modules is tracked...${NC}"
if git ls-files | grep -q "node_modules"; then
    echo -e "${YELLOW}⚠️  node_modules found in git, removing...${NC}"
    git rm -r --cached node_modules 2>/dev/null || true
    git rm -r --cached book-source/node_modules 2>/dev/null || true
    git commit -m "fix: Remove node_modules from tracking" 2>/dev/null || true
    echo -e "${GREEN}✅ Removed node_modules from tracking${NC}"
else
    echo -e "${GREEN}✅ node_modules is not tracked${NC}"
fi

echo ""

# Step 5: Check repository size
echo -e "${YELLOW}Checking repository size...${NC}"
REPO_SIZE=$(du -sh .git | cut -f1)
echo -e "Repository size: ${BLUE}${REPO_SIZE}${NC}"

# Warn if size is large
if [ -d node_modules ]; then
    echo -e "${YELLOW}⚠️  Warning: node_modules folder exists locally (this is OK)${NC}"
    echo -e "${YELLOW}   It will NOT be pushed (ignored by .gitignore)${NC}"
fi

echo ""

# Step 6: Show what will be pushed
echo -e "${YELLOW}Files that will be pushed:${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
git ls-files | grep -E "(BookChatbot|BookSearchBar|Root.tsx|CHATBOT-INFO)" || echo "  (New feature files)"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

TOTAL_FILES=$(git ls-files | wc -l)
echo -e "Total files to push: ${GREEN}${TOTAL_FILES}${NC}"
echo ""

# Step 7: Add new remote
echo -e "${YELLOW}Adding new remote...${NC}"
REMOTE_NAME="new-origin"

# Check if remote already exists
if git remote | grep -q "^${REMOTE_NAME}$"; then
    echo -e "${YELLOW}⚠️  Remote '${REMOTE_NAME}' already exists, removing...${NC}"
    git remote remove ${REMOTE_NAME}
fi

git remote add ${REMOTE_NAME} ${NEW_REPO_URL}
echo -e "${GREEN}✅ Added remote: ${REMOTE_NAME}${NC}"
echo ""

# Step 8: Show all remotes
echo -e "${YELLOW}Current remotes:${NC}"
git remote -v
echo ""

# Step 9: Confirm before push
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Ready to push to new repository!${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "Repository: ${BLUE}${NEW_REPO_URL}${NC}"
echo -e "Branch: ${BLUE}main${NC}"
echo -e "Files: ${GREEN}${TOTAL_FILES}${NC}"
echo -e "Size: ${BLUE}${REPO_SIZE}${NC}"
echo ""
read -p "Continue with push? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}❌ Push cancelled${NC}"
    exit 0
fi

echo ""

# Step 10: Push to new repository
echo -e "${YELLOW}Pushing to new repository...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Push main branch
if git push ${REMOTE_NAME} main; then
    echo -e "${GREEN}✅ Successfully pushed main branch${NC}"
else
    echo -e "${RED}❌ Failed to push main branch${NC}"
    echo -e "${YELLOW}You may need to authenticate or check your repository URL${NC}"
    exit 1
fi

echo ""

# Step 11: Push all branches (optional)
echo -e "${YELLOW}Push all branches? (y/n):${NC}"
read -p "> " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Pushing all branches...${NC}"
    git push ${REMOTE_NAME} --all
    echo -e "${GREEN}✅ All branches pushed${NC}"
fi

echo ""

# Step 12: Push tags (optional)
echo -e "${YELLOW}Push all tags? (y/n):${NC}"
read -p "> " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Pushing all tags...${NC}"
    git push ${REMOTE_NAME} --tags
    echo -e "${GREEN}✅ All tags pushed${NC}"
fi

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 Success! Code pushed to new repository${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Visit: ${BLUE}${NEW_REPO_URL%.git}${NC}"
echo -e "2. Verify all files are present"
echo -e "3. Check that node_modules is NOT in the repository"
echo -e "4. Clone and test: ${BLUE}git clone ${NEW_REPO_URL}${NC}"
echo ""
echo -e "${YELLOW}To make this your default remote:${NC}"
echo -e "  git remote remove origin"
echo -e "  git remote rename ${REMOTE_NAME} origin"
echo ""
echo -e "${GREEN}✨ Done!${NC}"
