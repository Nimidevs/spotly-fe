# 📁 Folder Structure Review & Recommendations

## Current Structure Analysis

### ✅ **What's Good:**
1. **Clear separation** of `components/`, `pages/`, `store/`, `api/`
2. **Feature-based organization** in components (`Landing/`, `onboarding/`)
3. **Redux structure** follows standard pattern (`store/slices/`)
4. **Assets folder** for static files

### ❌ **Issues & Recommendations:**

## 🔴 **Critical Issues (Must Fix):**

### 1. **Naming Inconsistencies**
```
❌ Current:
- logIn.tsx (camelCase)
- onboardModal.tsx (camelCase)
- signUp.tsx (camelCase)

✅ Should be:
- Login.tsx (PascalCase)
- OnboardModal.tsx (PascalCase)
- SignUp.tsx (PascalCase - already correct)
```
**Reason:** React components should use PascalCase for file names to match component naming conventions.

### 2. **Types/Interfaces Organization**
```
❌ Current:
src/interfaces.ts (single file at root)

✅ Should be:
src/types/
  ├── index.ts (re-export all)
  ├── modal.types.ts
  ├── api.types.ts
  └── user.types.ts
```
**Reason:** Types should be organized by domain, not all in one file. Makes it easier to maintain as project grows.

### 3. **Routes Organization**
```
❌ Current:
src/routes.tsx (at root)

✅ Should be:
src/router/
  ├── index.tsx
  └── routes.tsx
```
**Reason:** Router configuration should be in its own folder for better organization.

## 🟡 **Important Improvements (Should Fix):**

### 4. **API Organization**
```
❌ Current:
src/api/axios.ts (single file)

✅ Should be:
src/api/
  ├── axios.ts (or apiClient.ts)
  ├── endpoints.ts (API endpoint constants)
  └── services/
      ├── auth.service.ts
      ├── user.service.ts
      └── index.ts
```
**Reason:** Separate API client from service functions. Makes testing and maintenance easier.

### 5. **Constants Extraction**
```
❌ Current:
CONFIG object inside axios.ts

✅ Should be:
src/config/
  ├── index.ts
  ├── api.config.ts
  └── env.config.ts
```
**Reason:** Configuration should be centralized and environment-specific.

### 6. **Missing Utility Folder**
```
✅ Should add:
src/utils/
  ├── index.ts
  ├── formatters.ts
  ├── validators.ts
  └── helpers.ts
```
**Reason:** Utility functions will inevitably be needed. Better to have structure ready.

### 7. **Missing Hooks Folder**
```
✅ Should add:
src/hooks/
  ├── index.ts
  ├── useAuth.ts
  └── useModal.ts
```
**Reason:** Custom hooks should be organized separately from components.

## 🟢 **Nice-to-Have Improvements:**

### 8. **Assets Organization**
```
❌ Current:
src/assets/
  ├── modal-image.png
  ├── react.svg

✅ Should be:
src/assets/
  ├── images/
  │   └── modal-image.png
  ├── icons/
  └── fonts/
```
**Reason:** Better organization as assets grow.

### 9. **Store Types**
```
✅ Should add:
src/store/
  ├── store.ts
  ├── hooks.ts (typed hooks)
  ├── types.ts (store types)
  └── slices/
```
**Reason:** Redux Toolkit best practice - export typed hooks.

### 10. **Component Index Files**
```
✅ Should add:
src/components/
  ├── Landing/
  │   ├── index.ts (re-export)
  │   └── ...
  └── onboarding/
      ├── index.ts
      └── ...
```
**Reason:** Cleaner imports: `import { Navbar } from '@/components/Landing'`

## 📋 **Recommended Final Structure:**

```
src/
├── api/
│   ├── axios.ts (or apiClient.ts)
│   ├── endpoints.ts
│   └── services/
│       ├── auth.service.ts
│       └── index.ts
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── components/
│   ├── Landing/
│   │   ├── index.ts
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   └── onboarding/
│       ├── index.ts
│       ├── Login.tsx (renamed)
│       ├── OnboardModal.tsx (renamed)
│       └── SignUp.tsx
├── config/
│   ├── index.ts
│   ├── api.config.ts
│   └── env.config.ts
├── hooks/
│   ├── index.ts
│   └── useAuth.ts (example)
├── pages/
│   └── Landing.tsx
├── router/
│   ├── index.tsx
│   └── routes.tsx
├── store/
│   ├── store.ts
│   ├── hooks.ts
│   ├── types.ts
│   └── slices/
│       ├── tokenSlice.ts
│       └── userSlice.ts
├── types/
│   ├── index.ts
│   ├── modal.types.ts
│   ├── api.types.ts
│   └── user.types.ts
├── utils/
│   ├── index.ts
│   └── formatters.ts (example)
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 🎯 **Priority Action Items:**

### **High Priority:**
1. ✅ Rename `logIn.tsx` → `Login.tsx`
2. ✅ Rename `onboardModal.tsx` → `OnboardModal.tsx`
3. ✅ Move `interfaces.ts` → `src/types/` folder
4. ✅ Move `routes.tsx` → `src/router/` folder

### **Medium Priority:**
5. ✅ Organize API structure (`api/services/`)
6. ✅ Extract config to `src/config/`
7. ✅ Create `src/utils/` folder
8. ✅ Create `src/hooks/` folder

### **Low Priority:**
9. ✅ Organize assets into subfolders
10. ✅ Add index.ts files for cleaner imports
11. ✅ Add typed Redux hooks

## 📝 **Additional Notes:**

- Consider using **path aliases** in `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"],
        "@/components/*": ["./src/components/*"],
        "@/types/*": ["./src/types/*"]
      }
    }
  }
  ```

- This allows imports like: `import { Navbar } from '@/components/Landing'`


