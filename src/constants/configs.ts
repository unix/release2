export enum CHANGE_TYPES {
  major = 'major',
  minor = 'minor',
  patch = 'patch',
  pre = 'pre',
  fix = 'patch',
}

export const CHANGE_INFOS = {
  [CHANGE_TYPES.major]: {
    name: 'Major Change',
    pluralName: 'Major Changes',
    description: 'incompatible API change',
  },
  [CHANGE_TYPES.minor]: {
    name: 'Minor Change',
    pluralName: 'Minor Changes',
    description: 'backwards-compatible functionality',
  },
  [CHANGE_TYPES.patch]: {
    name: 'Patch',
    pluralName: 'Patches',
    description: 'backwards-compatible bug fix',
  },
  [CHANGE_TYPES.pre]: {
    name: 'Pre Release',
    pluralName: 'Pre Releases',
    description: 'pre release version',
  },
}
