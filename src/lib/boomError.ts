export enum ErrorTag {
	SRQ504,
	SRQ400,
	SRR400,
	CRM123,
	CRM124,
	CRM122,
	CRM121,
	CRM120,
	CRM119,
	CRM125,
	CRM126,
	CRM127,
	ADM101,
	ADM102,
	AUT100,
	ETA100,
	INV100,
	INV101,
	NPS100,
	USR100,
	USR101,
	USR102,
	USR103,
	USR104,
	USR105,
	USR106,
	USR107,
	PRS100,
	PRS101,
	VRC100,
	ASC100,
	ASC101,
	ASC102
}

interface IBoomError {
	errorTag: string;
	data?: {};
}

export function BoomError (errTag: ErrorTag, data?: {}): IBoomError  {
	return {
		errorTag: ErrorTag[errTag],
		...data
	};
}
