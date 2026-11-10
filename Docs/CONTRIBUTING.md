## Contributing

### Workflow

All contributions follow this flow — no exceptions:

```
main → your branch → commits → PR → review → merge → delete branch
```

**Step by step:**

**1. Always branch off from `main`**

Make sure your local `main` is up to date before creating a new branch:

```bash
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

**2. Make your changes and commit**

Commits must follow the pattern `<type>: <subject>`:

```bash
git add .
git commit -m "feat: add pinterest share button"
```

**3. Push your branch**

```bash
git push origin feature/your-feature-name
```

**4. Open a Pull Request**

- Go to the repository on GitHub
- Open a PR from your branch targeting `main`
- Fill in the PR title and description explaining what changed and why
- Request at least one reviewer before marking it as ready

**5. Wait for review**

- Do not merge your own PR
- Make sure the CI checks pass. They run lint, formatting, typecheck, tests, build and a package check on every PR
- Address all comments left by reviewers
- Push new commits to the same branch to update the PR — do not open a new one

**6. Merge and delete the branch**

Once the PR is approved:

- Merge it into `main` using **Create a merge commit**
- Delete the remote branch immediately after merging — GitHub shows a "Delete branch" button right after the merge
- (OPTIONAL) Delete your local branch too:

```bash
git checkout main
git pull origin main
git branch -d feature/your-feature-name
```

---

### Branch Naming

Branches must always start with one of the following prefixes:

| Prefix      | When to use                              |
| ----------- | ---------------------------------------- |
| `feature/`  | Adding a new feature                     |
| `bugfix/`   | Fixing a bug                             |
| `hotfix/`   | Urgent fix for a production issue        |
| `chore/`    | Maintenance, dependencies, configuration |
| `doc/`      | Documentation changes only               |

**Examples:**

```
feature/add-pinterest-button
bugfix/fix-whatsapp-url-encoding
hotfix/broken-facebook-share-link
chore/update-dependencies
doc/add-readme-examples
```

> Commits will be blocked on any branch that does not follow this convention.

---

### Commit Messages

Commits must follow the pattern `<type>: <subject>`, all in lowercase and with no scope:

| Type    | When to use                              |
| ------- | ---------------------------------------- |
| `feat`  | A new feature                            |
| `fix`   | A bug fix, including urgent ones         |
| `chore` | Maintenance, dependencies, configuration |
| `doc`   | Documentation changes                    |

`bugfix` and `hotfix` are branch prefixes only. Use `fix` as the commit type.

**Examples:**

```
feat: add pinterest share button
fix: fix whatsapp url encoding
fix: correct broken facebook share link
chore: update dependencies
doc: add usage examples to readme
```

> The pre-commit hook also runs the tests and formats staged files, so a failing test blocks the commit.

> Commits with an invalid message format will be rejected automatically by the commit hook.

---