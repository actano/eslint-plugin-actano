# package.json must not contain local yarn3 resolutions (no-local-resolutions)

Linking a package in yarn3 modifies the package.json resolutions field.
We want our buid pipeline to fail early when these are accidentally committed.

## Rule Details

This rule detects when the resolutions field in `package.json` contains a `portal:` entry.

Examples of **incorrect** code for this rule:

```json
{
    "resolutions": {
        "some-package": "portal:/some-package"
    }
}
```

Examples of **correct** code for this rule:

```json
{
    "resolutions": {
        "some-package": "1.2.3"
    }
}
```

This rule is **not autofixable**
