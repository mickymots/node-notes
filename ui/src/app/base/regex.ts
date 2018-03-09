export const REGEX = {
  ALPHANUMERIC: /^[\w\d\s]+$/i,
  DATE: {
    'DD/MM/YYYY': /[0-9][0-9][\\/][0-9][0-9][\\/][0-9][0-9][0-9][0-9]/
  },
  NUMERIC: /^([0-9]*)$/,
  ALPHANUMERIC_SPECIAL: /^[\w\d\s@.,%£]*$/,
  ADDRESS_LINES: /^[\w\d\s.,&?\-'()\/]*$/,
  POSTCODE: /[A-Z]{1,2}[0-99][0-9, A-Z]?[0-9][A-Z]{2}/,
  HOUSE_NAME: /^[\w\d\s.,&?'\-()\/]*$/,
  ALPHABETS: /^[a-zA-Z]+$/,
  CURRENCY: /^\£(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/,
  DEFAULT_NAME_FORMAT: /^[A-Z\'\-\ ]{0,40}$/,
  CRN_FORMAT: /^(AA|AB|AC|AE|AG|AH|AJ|AK|AL|AM|AN|AP|AR|AS|AT|AW|AX|AY|AZ|BA|BB|BC|BE|BH|BJ|BK|BL|BM|BN|BP|BR|BS|BT|BW|BX|BY|BZ|CA|CB|CC|CE|CG|CH|CJ|CK|CL|CM|CN|CP|CR|CS|CT|CW|CX|CY|CZ|EA|EB|EC|EE|EG|EH|EJ|EK|EL|EM|EN|EP|ER|ES|ET|EW|EX|EY|EZ|GA|GC|GE|GG|GH|GJ|GK|GL|GM|GN|GP|GR|GS|GT|GW|GX|GY|GZ|HA|HB|HC|HE|HG|HH|HJ|HK|HL|HM|HN|HP|HR|HS|HT|HW|HX|HY|HZ|JA|JB|JC|JE|JG|JH|JJ|JK|JL|JM|JN|JP|JR|JS|JT|JW|JX|JY|JZ|KA|KB|KE|KG|KH|KJ|KK|KL|KM|KP|KR|KS|KT|KW|KX|KY|KZ|LA|LB|LC|LE|LG|LH|LJ|LK|LL|LM|LN|LP|LR|LS|LT|LW|LX|LY|LZ|MA|MB|MC|ME|MG|MH|MJ|MK|ML|MM|MN|MP|MR|MS|MT|MW|MX|MY|MZ|NA|NB|NC|NE|NG|NH|NJ|NL|NM|NN|NP|NR|NS|NW|NX|NY|NZ|OA|OB|OC|OE|OG|OH|OJ|OK|OL|OM|ON|OP|OR|OS|OT|OW|OX|OY|OZ|PA|PB|PC|PE|PG|PH|PJ|PK|PL|PM|PN|PP|PR|PS|PT|PW|PX|PY|PZ|RA|RB|RC|RE|RG|RH|RJ|RK|RL|RM|RN|RP|RR|RS|RT|RW|RX|RY|RZ|SA|SB|SC|SE|SG|SH|SJ|SK|SL|SM|SN|SP|SR|SS|ST|SW|SX|SY|SZ|TA|TB|TC|TE|TG|TH|TJ|TK|TL|TM|TP|TR|TS|TT|TW|TX|TY|TZ|WA|WB|WC|WE|WG|WH|WK|WJ|WL|WM|WN|WP|WR|WS|WT|WW|WX|WY|WZ|XA|XB|XC|XE|XG|XH|XJ|XK|XL|XM|XN|XP|XR|XS|XT|XW|XX|XY|XZ|YA|YB|YC|YE|YG|YH|YJ|YK|YL|YM|YN|YP|YR|YS|YT|YW|YX|YY|YZ|ZA|ZB|ZC|ZE|ZG|ZH|ZJ|ZK|ZL|ZM|ZN|ZP|ZR|ZS|ZT|ZW|ZX|ZY)[0-9]{6}([ABCD\s]{1})?$/,
  CRN: /^(AA|AB|AC|AE|AG|AH|AJ|AK|AL|AM|AN|AP|AR|AS|AT|AW|AX|AY|AZ|BA|BB|BC|BE|BH|BJ|BK|BL|BM|BN|BP|BR|BS|BT|BW|BX|BY|BZ|CA|CB|CC|CE|CG|CH|CJ|CK|CL|CM|CN|CP|CR|CS|CT|CW|CX|CY|CZ|EA|EB|EC|EE|EG|EH|EJ|EK|EL|EM|EN|EP|ER|ES|ET|EW|EX|EY|EZ|GA|GC|GE|GG|GH|GJ|GK|GL|GM|GN|GP|GR|GS|GT|GW|GX|GY|GZ|HA|HB|HC|HE|HG|HH|HJ|HK|HL|HM|HN|HP|HR|HS|HT|HW|HX|HY|HZ|JA|JB|JC|JE|JG|JH|JJ|JK|JL|JM|JN|JP|JR|JS|JT|JW|JX|JY|JZ|KA|KB|KE|KG|KH|KJ|KK|KL|KM|KP|KR|KS|KT|KW|KX|KY|KZ|LA|LB|LC|LE|LG|LH|LJ|LK|LL|LM|LN|LP|LR|LS|LT|LW|LX|LY|LZ|MA|MB|MC|ME|MG|MH|MJ|MK|ML|MM|MN|MP|MR|MS|MT|MW|MX|MY|MZ|NA|NB|NC|NE|NG|NH|NJ|NL|NM|NN|NP|NR|NS|NW|NX|NY|NZ|OA|OB|OC|OE|OG|OH|OJ|OK|OL|OM|ON|OP|OR|OS|OT|OW|OX|OY|OZ|PA|PB|PC|PE|PG|PH|PJ|PK|PL|PM|PN|PP|PR|PS|PT|PW|PX|PY|PZ|RA|RB|RC|RE|RG|RH|RJ|RK|RL|RM|RN|RP|RR|RS|RT|RW|RX|RY|RZ|SA|SB|SC|SE|SG|SH|SJ|SK|SL|SM|SN|SP|SR|SS|ST|SW|SX|SY|SZ|TA|TB|TC|TE|TG|TH|TJ|TK|TL|TM|TP|TR|TS|TT|TW|TX|TY|TZ|WA|WB|WC|WE|WG|WH|WK|WJ|WL|WM|WN|WP|WR|WS|WT|WW|WX|WY|WZ|XA|XB|XC|XE|XG|XH|XJ|XK|XL|XM|XN|XP|XR|XS|XT|XW|XX|XY|XZ|YA|YB|YC|YE|YG|YH|YJ|YK|YL|YM|YN|YP|YR|YS|YT|YW|YX|YY|YZ|ZA|ZB|ZC|ZE|ZG|ZH|ZJ|ZK|ZL|ZM|ZN|ZP|ZR|ZS|ZT|ZW|ZX|ZY)[0-9]{6}$/,
  TFC_APPLICANT_MESSAGING: /^[a-zA-Z0-9 £!"#$%&'()/+,-.\n|\\\\:;<=>?@^_`~{}]+$/,
  MONEY: /^(\d+\.\d{2})$/,
  NINOTRN: /([ACEHJLMOPRSWXY][A-CEGHJ-NPR-TW-Z]|B[A-CEHJ-NPR-TW-Z]|G[ACEGHJ-NPR-TW-Z]|[KT][A-CEGHJ-MPR-TW-Z]|N[A-CEGHJL-NPR-SW-Z]|Z[A-CEGHJ-NPR-TW-Y])[0-9]{6}|[0-9]{2}[A-Z]{1}[0-9]{5}/,
  UTR_FORMAT: /^[1-9][0-9]*$/,
  SLCREF_FORMAT: /^[1-9][0-9]*$/,
  NINO_WITHOUT_SUFFIX: /([ACEHJLMOPRSWXY][A-CEGHJ-NPR-TW-Z]|B[A-CEHJ-NPR-TW-Z]|G[ACEGHJ-NPR-TW-Z]|[KT][A-CEGHJ-MPR-TW-Z]|N[A-CEGHJL-NPR-SW-Z]|Z[A-CEGHJ-NPR-TW-Y])[0-9]{6}/,
  NINO: /(^([ACEHJLMOPRSWXY][A-CEGHJ-NPR-TW-Z]|B[A-CEHJ-NPR-TW-Z]|G[ACEGHJ-NPR-TW-Z]|[KT][A-CEGHJ-MPR-TW-Z]|N[A-CEGHJL-NPR-SW-Z]|Z[A-CEGHJ-NPR-TW-Y])[0-9]{6}[A-D ]$)|(^([ACEHJLMOPRSWXY][A-CEGHJ-NPR-TW-Z]|B[A-CEHJ-NPR-TW-Z]|G[ACEGHJ-NPR-TW-Z]|[KT][A-CEGHJ-MPR-TW-Z]|N[A-CEGHJL-NPR-SW-Z]|Z[A-CEGHJ-NPR-TW-Y])[0-9]{6}$)/,
  TRN: /^[0-9]{2}[A-Z]{1}[0-9]{5}$/,
  BRN: /^([A-Z]|[0-9]|\/)+$/,
  FREE_TEXT: /^[^\[\]\*]+$/
};