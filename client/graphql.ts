/* tslint:disable */

export interface Query {
    csas?: CsasQuery | null;
    airBank?: AirBankQuery | null;
}

export interface CsasQuery {
    accounts?: CsasAccounts | null;
}

export interface CsasAccounts {
    pageNumber?: number | null;
    pageCount?: number | null;
    pageSize?: number | null;
    nextPage?: number | null;
    accounts?: (CsasAccount | null)[] | null;
}

export interface CsasAccount {
    id: string;
    identification?: CsasAccountIdentification | null;
    currency?: string | null;
    servicer?: CsasAccountServicer | null;
    nameI18N?: string | null;
    productI18N?: string | null;
}

export interface CsasAccountIdentification {
    iban: string;
    other?: string | null;
}

export interface CsasAccountServicer {
    bankCode?: string | null;
    countryCode?: string | null;
    bic?: string | null;
}

export interface AirBankQuery {
    branches?: (AirBankBranch | null)[] | null;
}

export interface AirBankBranch {
    id: string;
    name?: string | null;
    address?: AirBankBranchAddress | null;
    phones?: (string | null)[] | null;
    location?: AirBankBranchLocation | null;
    openingHours?: AirBankBranchOpeningHours | null;
    services?: (string | null)[] | null;
    pictures?: (string | null)[] | null;
}

export interface AirBankBranchAddress {
    streetAddress?: string | null;
    city?: string | null;
    zip?: string | null;
}

export interface AirBankBranchLocation {
    longitude?: number | null;
    latitude?: number | null;
}

export interface AirBankBranchOpeningHours {
    isNonstop?: boolean | null;
    days?: (AirBankBranchOpeningHoursDays | null)[] | null;
}

export interface AirBankBranchOpeningHoursDays {
    dayOfWeek?: number | null;
    opening?: string | null;
    closing?: string | null;
}
