# Security Checklist for GitHub

## Never Commit These:
- [ ] `.env` files with API keys, tokens, or passwords
- [ ] Personal access tokens or OAuth tokens
- [ ] AWS keys, API keys, or secrets
- [ ] Database connection strings with credentials
- [ ] Private keys (`.pem`, `.key` files)
- [ ] Credentials in commit messages
- [ ] SSH keys or certificates

## If You Accidentally Committed Credentials:

### Immediate Actions:
1. **Revoke the credentials immediately** - If it's an API key, token, or password
   - Go to the service's security settings
   - Regenerate or delete the exposed credential

2. **Check what was committed:**
   ```bash
   git log --all -S "your_secret" --oneline
   ```

3. **Remove from history** (if needed):
   ```bash
   # Using git filter-repo (recommended)
   git filter-repo --invert-paths --path "path/to/file"
   git push origin --force-with-lease
   ```

4. **Or use BFG Repo Cleaner:**
   ```bash
   bfg --delete-files "filename"
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   git push origin --force-with-lease
   ```

## Best Practices:

1. **Environment Variables:**
   - Create `.env.example` with placeholder values
   - Never commit actual `.env` files
   - Use `.env.local` for local development

2. **Commit Messages:**
   - Use clear, descriptive messages
   - Don't include credentials or tokens in messages

3. **Code Review:**
   - Always review changes before pushing
   - Use `git diff` and `git show` to check

4. **Tools:**
   - Enable git hooks with `pre-commit` framework
   - Use GitHub secret scanning
   - Consider using `detect-secrets` tool

## Example .env file structure:

```
# Never commit this file - it's in .gitignore
# Create .env.local for local development

VITE_API_URL=http://localhost:3000
VITE_API_KEY=your_key_here
DATABASE_URL=your_connection_string
```

## Example .env.example:

```
# Copy this to .env.local and fill in your actual values
VITE_API_URL=http://localhost:3000
VITE_API_KEY=
DATABASE_URL=
```

## For This Project:

All sensitive data should be:
- Stored in `.env.local` (not committed)
- Environment variables injected at build/runtime
- Never hardcoded in source files

If you need to update environment configuration:
1. Add to `.env.example` as a placeholder
2. Add actual value to `.env.local` (never commit)
3. Update deployment platform's secrets management
