# Repository Instructions

## Content Quality Before Page Count

For all future content, SEO, data and tool work, apply
`docs/content-quality-standard.md`. Start with the visitor's concrete task and
the evidence that can answer it. A source link, translation, word count or a
working template alone is not sufficient added value. Prefer useful comparison,
curation and task completion over more URLs. Do not fabricate tests, experience,
mechanics or freshness. Preserve uncertainty in both prose and calculations.
Record scope, evidence, validation and remaining gaps in a project checkpoint.

## Check Freshness Before Changes or Audits

Before modifying or auditing site content, code, data, translations, or SEO,
check the local checkout against GitHub. Repeat this check for each new task;
an earlier check or a cached `origin/main` is not proof of current remote state.

1. Read `git status --short --branch`, `git branch -vv`, and `git remote -v`.
   Identify the current branch, upstream, and uncommitted or untracked work.
2. Run `git fetch --prune origin`. This updates remote references without
   changing working files. If access fails, follow the environment's approval
   procedure where applicable. If fetching remains unavailable, state that
   GitHub freshness is unverified; do not claim the checkout is current or
   present an audit as covering the latest GitHub version.
3. Compare `HEAD` with the fetched upstream using
   `git rev-list --left-right --count HEAD...@{upstream}` and inspect differing
   commits with `git log --oneline --left-right HEAD...@{upstream}`.
   For a branch without an upstream, compare with `origin/main`. When working
   on a feature branch, also compare it with `origin/main` to identify changes
   on the production source branch. Treat the two counts as local-only and
   remote-only commits; do not decide freshness from commit timestamps.
4. Briefly report the comparison, the relevant commit IDs, and whether local
   uncommitted changes exist before beginning substantive changes or an audit.

Handle the comparison as follows:

- Equal: proceed, including relevant uncommitted work in the stated scope.
- Local behind: on a clean `main` tracking `origin/main`, fast-forward with
  `git merge --ff-only origin/main` before working, unless the user explicitly
  requests an older revision. Otherwise inspect the differences and establish
  the intended baseline without overwriting local work.
- Local ahead: preserve local commits, report that they are not on the
  upstream, and proceed with the local baseline unless the user requests a
  different revision. Do not push solely to make the versions match.
- Diverged: inspect both sides and report the divergence. Do not automatically
  rebase, merge divergent history, reset, or choose a side. Continue independent
  inspection; ask for the baseline only when it is needed to proceed.
- Dirty working tree: preserve all existing changes. Do not automatically
  stash, discard, reset, or overwrite them to synchronize the checkout.

A clean working tree does not prove that GitHub is current, and fetching does
not synchronize working files. GitHub source freshness also does not prove
that the deployed website matches it; verify deployment separately when the
task concerns the live site.

Before publishing or pushing completed changes, fetch again and check whether
the relevant remote branch advanced during the task. Resolve or report new
differences before proceeding. Push and deployment still require authorization
from the user's task; this freshness check alone does not authorize either.
