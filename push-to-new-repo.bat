@echo off
REM ========================================
REM Push to New Repository Script (Windows)
REM ========================================
REM This script helps push your code to a new GitHub repository
REM while ensuring node_modules is properly ignored

setlocal enabledelayedexpansion

echo ================================
echo   Push to New Repository
echo ================================
echo.

REM Step 1: Check if in git repository
if not exist .git (
    echo [ERROR] Not a git repository
    echo Run: git init
    pause
    exit /b 1
)

echo [OK] Git repository detected
echo.

REM Step 2: Get new repository URL
set /p NEW_REPO_URL="Enter your new GitHub repository URL: "

if "%NEW_REPO_URL%"=="" (
    echo [ERROR] Repository URL cannot be empty
    pause
    exit /b 1
)

echo.
echo [OK] Repository URL: %NEW_REPO_URL%
echo.

REM Step 3: Check .gitignore
echo Checking .gitignore...

if not exist .gitignore (
    echo [WARNING] .gitignore not found, creating one...
    (
        echo # Dependencies
        echo /node_modules
        echo book-source/node_modules
        echo.
        echo # Production
        echo /build
        echo.
        echo # Generated files
        echo .docusaurus
        echo .cache-loader
        echo.
        echo # Misc
        echo .DS_Store
        echo .env*
        echo npm-debug.log*
        echo yarn-debug.log*
        echo yarn-error.log*
    ) > .gitignore
    echo [OK] Created .gitignore
) else (
    findstr /C:"node_modules" .gitignore >nul
    if errorlevel 1 (
        echo [WARNING] Adding node_modules to .gitignore...
        echo /node_modules >> .gitignore
        echo book-source/node_modules >> .gitignore
        echo [OK] Updated .gitignore
    ) else (
        echo [OK] node_modules is in .gitignore
    )
)

echo.

REM Step 4: Check git status
echo Checking git status...
git status --short
echo.

REM Step 5: Check repository size
echo Checking repository size...
for /f "tokens=*" %%a in ('git count-objects -v ^| findstr "size-pack"') do (
    echo Repository: %%a
)
echo.

if exist node_modules (
    echo [INFO] node_modules folder exists locally
    echo        It will NOT be pushed ^(ignored by .gitignore^)
    echo.
)

REM Step 6: Show tracked files count
echo Counting tracked files...
for /f %%a in ('git ls-files ^| find /c /v ""') do set TOTAL_FILES=%%a
echo Total files to push: %TOTAL_FILES%
echo.

REM Step 7: Add new remote
echo Adding new remote...
set REMOTE_NAME=new-origin

git remote | findstr /x "%REMOTE_NAME%" >nul
if not errorlevel 1 (
    echo [WARNING] Remote '%REMOTE_NAME%' already exists, removing...
    git remote remove %REMOTE_NAME%
)

git remote add %REMOTE_NAME% %NEW_REPO_URL%
if errorlevel 1 (
    echo [ERROR] Failed to add remote
    pause
    exit /b 1
)

echo [OK] Added remote: %REMOTE_NAME%
echo.

REM Step 8: Show all remotes
echo Current remotes:
git remote -v
echo.

REM Step 9: Confirm before push
echo ========================================
echo Ready to push to new repository!
echo ========================================
echo Repository: %NEW_REPO_URL%
echo Branch: main
echo Files: %TOTAL_FILES%
echo.
set /p CONFIRM="Continue with push? (y/n): "

if /i not "%CONFIRM%"=="y" (
    echo [CANCELLED] Push cancelled
    pause
    exit /b 0
)

echo.

REM Step 10: Push to new repository
echo Pushing to new repository...
echo ========================================

git push %REMOTE_NAME% main
if errorlevel 1 (
    echo [ERROR] Failed to push main branch
    echo You may need to authenticate or check your repository URL
    echo.
    echo Try using a Personal Access Token:
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Generate new token
    echo 3. Use token as password when prompted
    pause
    exit /b 1
)

echo [OK] Successfully pushed main branch
echo.

REM Step 11: Push all branches (optional)
set /p PUSH_ALL="Push all branches? (y/n): "
echo.

if /i "%PUSH_ALL%"=="y" (
    echo Pushing all branches...
    git push %REMOTE_NAME% --all
    echo [OK] All branches pushed
    echo.
)

REM Step 12: Push tags (optional)
set /p PUSH_TAGS="Push all tags? (y/n): "
echo.

if /i "%PUSH_TAGS%"=="y" (
    echo Pushing all tags...
    git push %REMOTE_NAME% --tags
    echo [OK] All tags pushed
    echo.
)

REM Success message
echo ========================================
echo    SUCCESS! Code pushed to new repository
echo ========================================
echo.
echo Next steps:
echo 1. Visit: %NEW_REPO_URL:.git=%
echo 2. Verify all files are present
echo 3. Check that node_modules is NOT in the repository
echo 4. Clone and test: git clone %NEW_REPO_URL%
echo.
echo To make this your default remote:
echo   git remote remove origin
echo   git remote rename %REMOTE_NAME% origin
echo.
echo Done!
echo.
pause
