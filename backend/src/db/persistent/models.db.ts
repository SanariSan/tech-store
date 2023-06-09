/* tslint:disable */
/* eslint-disable */

/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * This file was automatically generated by pg-to-ts v.4.1.0
 * $ pg-to-ts generate -c postgresql://username:password@localhost:5432/postgres -t searchquery -t searchqueryvacancyhh -t systemrole -t systemuser -t systemusersystemrole -t vacancyhh -s public
 *
 */

export type Json = unknown;

// Table searchquery
export interface Searchquery {
  id: number;
  uuid_: string;
  userid: number;
  searchtext: string;
  searchparams: string;
  isaknowledged: boolean;
  lastaknowledged: Date | null;
  notifypostedsecagomax: number | null;
  modified: Date;
}
export interface SearchqueryInput {
  id?: number;
  uuid_?: string;
  userid: number;
  searchtext: string;
  searchparams: string;
  isaknowledged?: boolean;
  lastaknowledged?: Date | null;
  notifypostedsecagomax?: number | null;
  modified?: Date;
}
const searchquery = {
  tableName: 'searchquery',
  columns: [
    'id',
    'uuid_',
    'userid',
    'searchtext',
    'searchparams',
    'isaknowledged',
    'lastaknowledged',
    'notifypostedsecagomax',
    'modified',
  ],
  requiredForInsert: ['userid', 'searchtext', 'searchparams'],
  primaryKey: 'id',
  foreignKeys: {
    userid: { table: 'systemuser', column: 'id', $type: null as unknown as Systemuser },
  },
  $type: null as unknown as Searchquery,
  $input: null as unknown as SearchqueryInput,
} as const;

// Table searchqueryvacancyhh
export interface Searchqueryvacancyhh {
  searchqueryid: number;
  vacancyid: number;
}
export interface SearchqueryvacancyhhInput {
  searchqueryid: number;
  vacancyid: number;
}
const searchqueryvacancyhh = {
  tableName: 'searchqueryvacancyhh',
  columns: ['searchqueryid', 'vacancyid'],
  requiredForInsert: ['searchqueryid', 'vacancyid'],
  primaryKey: 'searchqueryid',
  foreignKeys: {
    searchqueryid: { table: 'searchquery', column: 'id', $type: null as unknown as Searchquery },
    vacancyid: { table: 'vacancyhh', column: 'id', $type: null as unknown as Vacancyhh },
  },
  $type: null as unknown as Searchqueryvacancyhh,
  $input: null as unknown as SearchqueryvacancyhhInput,
} as const;

// Table systemrole
export interface Systemrole {
  id: number;
  rolename: string;
}
export interface SystemroleInput {
  id?: number;
  rolename: string;
}
const systemrole = {
  tableName: 'systemrole',
  columns: ['id', 'rolename'],
  requiredForInsert: ['rolename'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Systemrole,
  $input: null as unknown as SystemroleInput,
} as const;

// Table systemuser
export interface Systemuser {
  id: number;
  email: string;
  username: string;
  passwordhash: string;
  telegramid: string | null;
  hhtoken: string | null;
  isactivated: boolean;
  otptoken: string | null;
  createdon: Date;
  modified: Date;
}
export interface SystemuserInput {
  id?: number;
  email: string;
  username: string;
  passwordhash: string;
  telegramid?: string | null;
  hhtoken?: string | null;
  isactivated?: boolean;
  otptoken?: string | null;
  createdon?: Date;
  modified?: Date;
}
const systemuser = {
  tableName: 'systemuser',
  columns: [
    'id',
    'email',
    'username',
    'passwordhash',
    'telegramid',
    'hhtoken',
    'isactivated',
    'otptoken',
    'createdon',
    'modified',
  ],
  requiredForInsert: ['email', 'username', 'passwordhash'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Systemuser,
  $input: null as unknown as SystemuserInput,
} as const;

// Table systemusersystemrole
export interface Systemusersystemrole {
  userid: number;
  roleid: number;
}
export interface SystemusersystemroleInput {
  userid: number;
  roleid: number;
}
const systemusersystemrole = {
  tableName: 'systemusersystemrole',
  columns: ['userid', 'roleid'],
  requiredForInsert: ['userid', 'roleid'],
  primaryKey: 'userid',
  foreignKeys: {
    userid: { table: 'systemuser', column: 'id', $type: null as unknown as Systemuser },
    roleid: { table: 'systemrole', column: 'id', $type: null as unknown as Systemrole },
  },
  $type: null as unknown as Systemusersystemrole,
  $input: null as unknown as SystemusersystemroleInput,
} as const;

// Table vacancyhh
export interface Vacancyhh {
  id: number;
  hhid: number;
  hashmd5: string;
  title: string;
  createdat: string;
  publishedat: string;
  hastest: boolean;
  responseletterrequired: boolean;
  areaid: number;
  scheduleid: string;
  employerurl: string;
  employername: string;
  descriptionfull: string | null;
  snippetrequirement: string | null;
  snippetresponsibility: string | null;
  salarycurrencyid: number | null;
  salaryfrom: number | null;
  salaryto: number | null;
  addressraw: string | null;
  modified: Date;
}
export interface VacancyhhInput {
  id?: number;
  hhid: number;
  hashmd5: string;
  title: string;
  createdat: string;
  publishedat: string;
  hastest: boolean;
  responseletterrequired: boolean;
  areaid: number;
  scheduleid: string;
  employerurl: string;
  employername: string;
  descriptionfull?: string | null;
  snippetrequirement?: string | null;
  snippetresponsibility?: string | null;
  salarycurrencyid?: number | null;
  salaryfrom?: number | null;
  salaryto?: number | null;
  addressraw?: string | null;
  modified?: Date;
}
const vacancyhh = {
  tableName: 'vacancyhh',
  columns: [
    'id',
    'hhid',
    'hashmd5',
    'title',
    'createdat',
    'publishedat',
    'hastest',
    'responseletterrequired',
    'areaid',
    'scheduleid',
    'employerurl',
    'employername',
    'descriptionfull',
    'snippetrequirement',
    'snippetresponsibility',
    'salarycurrencyid',
    'salaryfrom',
    'salaryto',
    'addressraw',
    'modified',
  ],
  requiredForInsert: [
    'hhid',
    'hashmd5',
    'title',
    'createdat',
    'publishedat',
    'hastest',
    'responseletterrequired',
    'areaid',
    'scheduleid',
    'employerurl',
    'employername',
  ],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Vacancyhh,
  $input: null as unknown as VacancyhhInput,
} as const;

export interface TableTypes {
  searchquery: {
    select: Searchquery;
    input: SearchqueryInput;
  };
  searchqueryvacancyhh: {
    select: Searchqueryvacancyhh;
    input: SearchqueryvacancyhhInput;
  };
  systemrole: {
    select: Systemrole;
    input: SystemroleInput;
  };
  systemuser: {
    select: Systemuser;
    input: SystemuserInput;
  };
  systemusersystemrole: {
    select: Systemusersystemrole;
    input: SystemusersystemroleInput;
  };
  vacancyhh: {
    select: Vacancyhh;
    input: VacancyhhInput;
  };
}

export const tables = {
  searchquery,
  searchqueryvacancyhh,
  systemrole,
  systemuser,
  systemusersystemrole,
  vacancyhh,
};
