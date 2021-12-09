import React, { useEffect } from "react";


const is_page_exist_private = () => {
    let is_page_exist = false;
    const pathname = window.location.pathname.replace("/webapp", "");
    switch (pathname) {
        case "/home":
            is_page_exist = true
        case "/signup-completed":
            is_page_exist = true
        case "/chat":
            is_page_exist = true
        case "/likes":
            is_page_exist = true
        case "/profile":
            is_page_exist = true
        case (pathname.match("/single-profile") ? pathname : ""):
            is_page_exist = true
        case "/message-online":
            is_page_exist = true
        case "/update-profile":
            is_page_exist = true
        case (pathname.match("/message-box") ? pathname : ""):
            is_page_exist = true
    }
    return is_page_exist
}

const is_page_exist_protected = () => {
    let is_page_exist = false;
    const pathname = window.location.pathname.replace("/webapp", "");
    switch (pathname) {
        case "/login":
            is_page_exist = true
    }
    return is_page_exist
}

const is_page_exist_app = (params) => {
    let is_page_exist = false;
    const pathname = window.location.pathname.replace("/webapp", "");
    switch (pathname) {
        case "/login":
            is_page_exist = true
        case "/home":
            is_page_exist = true
        case "/signup-completed":
            is_page_exist = true
        case "/chat":
            is_page_exist = true
        case "/likes":
            is_page_exist = true
        case "/profile":
            is_page_exist = true
        case (pathname.match("/single-profile") ? pathname : ""):
            is_page_exist = true
        case "/message-online":
            is_page_exist = true
        case "/update-profile":
            is_page_exist = true
        case (pathname.match("/message-box") ? pathname : ""):
            is_page_exist = true
    }
    return is_page_exist
}

const addBodyClass = (className) => {
    return () => useEffect(() => {
        document.body.className = className;
        return () => {
            document.body.className = 'no-bg';
        }
    });
}

const replceMultiStringWithSIngle = (string) => {
    string = string.trim().replace(/\s\s+/g, ' ');
    return string
}

const countries = [
    { code: 'AD', label: 'Andorra', phone: '376', value: 'Andorra' },
    { code: 'AE', label: 'United Arab Emirates', phone: '971', value: 'United Arab Emirates' },
    { code: 'AF', label: 'Afghanistan', phone: '93', value: 'Afghanistan' },
    { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268', value: 'Antigua and Barbuda' },
    { code: 'AI', label: 'Anguilla', phone: '1-264', value: 'Anguilla' },
    { code: 'AL', label: 'Albania', phone: '355', value: 'Albania' },
    { code: 'AM', label: 'Armenia', phone: '374', value: 'Armenia' },
    { code: 'AO', label: 'Angola', phone: '244', value: 'Angola' },
    { code: 'AQ', label: 'Antarctica', phone: '672', value: 'Antarctica' },
    { code: 'AR', label: 'Argentina', phone: '54', value: 'Argentina' },
    { code: 'AS', label: 'American Samoa', phone: '1-684', value: 'American Samoa' },
    { code: 'AT', label: 'Austria', phone: '43', value: 'Austria' },
    { code: 'AU', label: 'Australia', phone: '61', suggested: true, value: 'Australia' },
    { code: 'AW', label: 'Aruba', phone: '297', value: 'Aruba' },
    { code: 'AX', label: 'Alland Islands', phone: '358', value: 'Alland Islands' },
    { code: 'AZ', label: 'Azerbaijan', phone: '994', value: 'Azerbaijan' },
    { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387', value: 'Bosnia and Herzegovina' },
    { code: 'BB', label: 'Barbados', phone: '1-246', value: 'Barbados' },
    { code: 'BD', label: 'Bangladesh', phone: '880', value: 'Bangladesh' },
    { code: 'BE', label: 'Belgium', phone: '32', value: 'Belgium' },
    { code: 'BF', label: 'Burkina Faso', phone: '226', value: 'Burkina Faso' },
    { code: 'BG', label: 'Bulgaria', phone: '359', value: 'Bulgaria' },
    { code: 'BH', label: 'Bahrain', phone: '973', value: 'Bahrain' },
    { code: 'BI', label: 'Burundi', phone: '257', value: 'Burundi' },
    { code: 'BJ', label: 'Benin', phone: '229', value: 'Benin' },
    { code: 'BL', label: 'Saint Barthelemy', phone: '590', value: 'Saint Barthelemy' },
    { code: 'BM', label: 'Bermuda', phone: '1-441', value: 'Bermuda' },
    { code: 'BN', label: 'Brunei Darussalam', phone: '673', value: 'Brunei Darussalam' },
    { code: 'BO', label: 'Bolivia', phone: '591', value: 'Bolivia' },
    { code: 'BR', label: 'Brazil', phone: '55', value: 'Brazil' },
    { code: 'BS', label: 'Bahamas', phone: '1-242', value: 'Bahamas' },
    { code: 'BT', label: 'Bhutan', phone: '975', value: 'Bhutan' },
    { code: 'BV', label: 'Bouvet Island', phone: '47', value: 'Bouvet Island' },
    { code: 'BW', label: 'Botswana', phone: '267', value: 'Botswana' },
    { code: 'BY', label: 'Belarus', phone: '375', value: 'Belarus' },
    { code: 'BZ', label: 'Belize', phone: '501', value: 'Belize' },
    { code: 'CA', label: 'Canada', phone: '1', suggested: true, value: 'Canada' },
    { code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61', value: 'Cocos (Keeling) Islands' },
    { code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243', value: 'Congo, Democratic Republic of the' },
    { code: 'CF', label: 'Central African Republic', phone: '236', value: 'Central African Republic' },
    { code: 'CG', label: 'Congo, Republic of the', phone: '242', value: 'Congo, Republic of the' },
    { code: 'CH', label: 'Switzerland', phone: '41', value: 'Switzerland' },
    { code: 'CI', label: "Cote d'Ivoire", phone: '225', value: "Cote d'Ivoire" },
    { code: 'CK', label: 'Cook Islands', phone: '682', value: 'Cook Islands' },
    { code: 'CL', label: 'Chile', phone: '56', value: 'Chile' },
    { code: 'CM', label: 'Cameroon', phone: '237', value: 'Cameroon' },
    { code: 'CN', label: 'China', phone: '86', value: 'China' },
    { code: 'CO', label: 'Colombia', phone: '57', value: 'Colombia' },
    { code: 'CR', label: 'Costa Rica', phone: '506', value: 'Costa Rica' },
    { code: 'CU', label: 'Cuba', phone: '53', value: 'Cuba' },
    { code: 'CV', label: 'Cape Verde', phone: '238', value: 'Cape Verde' },
    { code: 'CW', label: 'Curacao', phone: '599', value: 'Curacao' },
    { code: 'CX', label: 'Christmas Island', phone: '61', value: 'Christmas Island' },
    { code: 'CY', label: 'Cyprus', phone: '357', value: 'Cyprus' },
    { code: 'CZ', label: 'Czech Republic', phone: '420', value: 'Czech Republic' },
    { code: 'DE', label: 'Germany', phone: '49', suggested: true, value: 'Germany' },
    { code: 'DJ', label: 'Djibouti', phone: '253', value: 'Djibouti' },
    { code: 'DK', label: 'Denmark', phone: '45', value: 'Denmark' },
    { code: 'DM', label: 'Dominica', phone: '1-767', value: 'Dominica' },
    { code: 'DO', label: 'Dominican Republic', phone: '1-809', value: 'Dominican Republic' },
    { code: 'DZ', label: 'Algeria', phone: '213', value: 'Algeria' },
    { code: 'EC', label: 'Ecuador', phone: '593', value: 'Ecuador' },
    { code: 'EE', label: 'Estonia', phone: '372', value: 'Estonia' },
    { code: 'EG', label: 'Egypt', phone: '20', value: 'Egypt' },
    { code: 'EH', label: 'Western Sahara', phone: '212', value: 'Western Sahara' },
    { code: 'ER', label: 'Eritrea', phone: '291', value: 'Eritrea' },
    { code: 'ES', label: 'Spain', phone: '34', value: 'Spain' },
    { code: 'ET', label: 'Ethiopia', phone: '251', value: 'Ethiopia' },
    { code: 'FI', label: 'Finland', phone: '358', value: 'Finland' },
    { code: 'FJ', label: 'Fiji', phone: '679', value: 'Fiji' },
    { code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500', value: 'Falkland Islands (Malvinas)' },
    { code: 'FM', label: 'Micronesia, Federated States of', phone: '691', value: 'Micronesia, Federated States of' },
    { code: 'FO', label: 'Faroe Islands', phone: '298', value: 'Faroe Islands' },
    { code: 'FR', label: 'France', phone: '33', suggested: true, value: 'France' },
    { code: 'GA', label: 'Gabon', phone: '241', value: 'Gabon' },
    { code: 'GB', label: 'United Kingdom', phone: '44', value: 'United Kingdom' },
    { code: 'GD', label: 'Grenada', phone: '1-473', value: 'Grenada' },
    { code: 'GE', label: 'Georgia', phone: '995', value: 'Georgia' },
    { code: 'GF', label: 'French Guiana', phone: '594', value: 'French Guiana' },
    { code: 'GG', label: 'Guernsey', phone: '44', value: 'Guernsey' },
    { code: 'GH', label: 'Ghana', phone: '233', value: 'Ghana' },
    { code: 'GI', label: 'Gibraltar', phone: '350', value: 'Gibraltar' },
    { code: 'GL', label: 'Greenland', phone: '299', value: 'Greenland' },
    { code: 'GM', label: 'Gambia', phone: '220', value: 'Gambia' },
    { code: 'GN', label: 'Guinea', phone: '224', value: 'Guinea' },
    { code: 'GP', label: 'Guadeloupe', phone: '590', value: 'Guadeloupe' },
    { code: 'GQ', label: 'Equatorial Guinea', phone: '240', value: 'Equatorial Guinea' },
    { code: 'GR', label: 'Greece', phone: '30', value: 'Greece' },
    { code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500', value: 'South Georgia and the South Sandwich Islands' },
    { code: 'GT', label: 'Guatemala', phone: '502', value: 'Guatemala' },
    { code: 'GU', label: 'Guam', phone: '1-671', value: 'Guam' },
    { code: 'GW', label: 'Guinea-Bissau', phone: '245', value: 'Guinea-Bissau' },
    { code: 'GY', label: 'Guyana', phone: '592', value: 'Guyana' },
    { code: 'HK', label: 'Hong Kong', phone: '852', value: 'Hong Kong' },
    { code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672', value: 'Heard Island and McDonald Islands' },
    { code: 'HN', label: 'Honduras', phone: '504', value: 'Honduras' },
    { code: 'HR', label: 'Croatia', phone: '385', value: 'Croatia' },
    { code: 'HT', label: 'Haiti', phone: '509', value: 'Haiti' },
    { code: 'HU', label: 'Hungary', phone: '36', value: 'Hungary' },
    { code: 'ID', label: 'Indonesia', phone: '62', value: 'Indonesia' },
    { code: 'IE', label: 'Ireland', phone: '353', value: 'Ireland' },
    { code: 'IL', label: 'Israel', phone: '972', value: 'Israel' },
    { code: 'IM', label: 'Isle of Man', phone: '44', value: 'Isle of Man' },
    { code: 'IN', label: 'India', phone: '91', value: 'India' },
    { code: 'IO', label: 'British Indian Ocean Territory', phone: '246', value: 'British Indian Ocean Territory' },
    { code: 'IQ', label: 'Iraq', phone: '964', value: 'Iraq' },
    { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98', value: 'Iran, Islamic Republic of' },
    { code: 'IS', label: 'Iceland', phone: '354', value: 'Iceland' },
    { code: 'IT', label: 'Italy', phone: '39', value: 'Italy' },
    { code: 'JE', label: 'Jersey', phone: '44', value: 'Jersey' },
    { code: 'JM', label: 'Jamaica', phone: '1-876', value: 'Jamaica' },
    { code: 'JO', label: 'Jordan', phone: '962', value: 'Jordan' },
    { code: 'JP', label: 'Japan', phone: '81', suggested: true, value: 'Japan' },
    { code: 'KE', label: 'Kenya', phone: '254', value: 'Kenya' },
    { code: 'KG', label: 'Kyrgyzstan', phone: '996', value: 'Kyrgyzstan' },
    { code: 'KH', label: 'Cambodia', phone: '855', value: 'Cambodia' },
    { code: 'KI', label: 'Kiribati', phone: '686', value: 'Kiribati' },
    { code: 'KM', label: 'Comoros', phone: '269', value: 'Comoros' },
    { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869', value: 'Saint Kitts and Nevis' },
    { code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850', value: "Korea, Democratic People's Republic of" },
    { code: 'KR', label: 'Korea, Republic of', phone: '82', value: 'Korea, Republic of' },
    { code: 'KW', label: 'Kuwait', phone: '965', value: 'Kuwait' },
    { code: 'KY', label: 'Cayman Islands', phone: '1-345', value: 'Cayman Islands' },
    { code: 'KZ', label: 'Kazakhstan', phone: '7', value: 'Kazakhstan' },
    { code: 'LA', label: "Lao People's Democratic Republic", phone: '856', value: "Lao People's Democratic Republic" },
    { code: 'LB', label: 'Lebanon', phone: '961', value: 'Lebanon' },
    { code: 'LC', label: 'Saint Lucia', phone: '1-758', value: 'Saint Lucia' },
    { code: 'LI', label: 'Liechtenstein', phone: '423', value: 'Liechtenstein' },
    { code: 'LK', label: 'Sri Lanka', phone: '94', value: 'Sri Lanka' },
    { code: 'LR', label: 'Liberia', phone: '231', value: 'Liberia' },
    { code: 'LS', label: 'Lesotho', phone: '266', value: 'Lesotho' },
    { code: 'LT', label: 'Lithuania', phone: '370', value: 'Lithuania' },
    { code: 'LU', label: 'Luxembourg', phone: '352', value: 'Luxembourg' },
    { code: 'LV', label: 'Latvia', phone: '371', value: 'Latvia' },
    { code: 'LY', label: 'Libya', phone: '218', value: 'Libya' },
    { code: 'MA', label: 'Morocco', phone: '212', value: 'Morocco' },
    { code: 'MC', label: 'Monaco', phone: '377', value: 'Monaco' },
    { code: 'MD', label: 'Moldova, Republic of', phone: '373', value: 'Moldova, Republic of' },
    { code: 'ME', label: 'Montenegro', phone: '382', value: 'Montenegro' },
    { code: 'MF', label: 'Saint Martin (French part)', phone: '590', value: 'Saint Martin (French part)' },
    { code: 'MG', label: 'Madagascar', phone: '261', value: 'Madagascar' },
    { code: 'MH', label: 'Marshall Islands', phone: '692', value: 'Marshall Islands' },
    { code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389', value: 'Macedonia, the Former Yugoslav Republic of' },
    { code: 'ML', label: 'Mali', phone: '223', value: 'Mali' },
    { code: 'MM', label: 'Myanmar', phone: '95', value: 'Myanmar' },
    { code: 'MN', label: 'Mongolia', phone: '976', value: 'Mongolia' },
    { code: 'MO', label: 'Macao', phone: '853', value: 'Macao' },
    { code: 'MP', label: 'Northern Mariana Islands', phone: '1-670', value: 'Northern Mariana Islands' },
    { code: 'MQ', label: 'Martinique', phone: '596', value: 'Martinique' },
    { code: 'MR', label: 'Mauritania', phone: '222', value: 'Mauritania' },
    { code: 'MS', label: 'Montserrat', phone: '1-664', value: 'Montserrat' },
    { code: 'MT', label: 'Malta', phone: '356', value: 'Malta' },
    { code: 'MU', label: 'Mauritius', phone: '230', value: 'Mauritius' },
    { code: 'MV', label: 'Maldives', phone: '960', value: 'Maldives' },
    { code: 'MW', label: 'Malawi', phone: '265', value: 'Malawi' },
    { code: 'MX', label: 'Mexico', phone: '52', value: 'Mexico' },
    { code: 'MY', label: 'Malaysia', phone: '60', value: 'Malaysia' },
    { code: 'MZ', label: 'Mozambique', phone: '258', value: 'Mozambique' },
    { code: 'NA', label: 'Namibia', phone: '264', value: 'Namibia' },
    { code: 'NC', label: 'New Caledonia', phone: '687', value: 'New Caledonia' },
    { code: 'NE', label: 'Niger', phone: '227', value: 'Niger' },
    { code: 'NF', label: 'Norfolk Island', phone: '672', value: 'Norfolk Island' },
    { code: 'NG', label: 'Nigeria', phone: '234', value: 'Nigeria' },
    { code: 'NI', label: 'Nicaragua', phone: '505', value: 'Nicaragua' },
    { code: 'NL', label: 'Netherlands', phone: '31', value: 'Netherlands' },
    { code: 'NO', label: 'Norway', phone: '47', value: 'Norway' },
    { code: 'NP', label: 'Nepal', phone: '977', value: 'Nepal' },
    { code: 'NR', label: 'Nauru', phone: '674', value: 'Nauru' },
    { code: 'NU', label: 'Niue', phone: '683', value: 'Niue' },
    { code: 'NZ', label: 'New Zealand', phone: '64', value: 'New Zealand' },
    { code: 'OM', label: 'Oman', phone: '968', value: 'Oman' },
    { code: 'PA', label: 'Panama', phone: '507', value: 'Panama' },
    { code: 'PE', label: 'Peru', phone: '51', value: 'Peru' },
    { code: 'PF', label: 'French Polynesia', phone: '689', value: 'French Polynesia' },
    { code: 'PG', label: 'Papua New Guinea', phone: '675', value: 'Papua New Guinea' },
    { code: 'PH', label: 'Philippines', phone: '63', value: 'Philippines' },
    { code: 'PK', label: 'Pakistan', phone: '92', value: 'Pakistan' },
    { code: 'PL', label: 'Poland', phone: '48', value: 'Poland' },
    { code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508', value: 'Saint Pierre and Miquelon' },
    { code: 'PN', label: 'Pitcairn', phone: '870', value: 'Pitcairn' },
    { code: 'PR', label: 'Puerto Rico', phone: '1', value: 'Puerto Rico' },
    { code: 'PS', label: 'Palestine, State of', phone: '970', value: 'Palestine, State of' },
    { code: 'PT', label: 'Portugal', phone: '351', value: 'Portugal' },
    { code: 'PW', label: 'Palau', phone: '680', value: 'Palau' },
    { code: 'PY', label: 'Paraguay', phone: '595', value: 'Paraguay' },
    { code: 'QA', label: 'Qatar', phone: '974', value: 'Qatar' },
    { code: 'RE', label: 'Reunion', phone: '262', value: 'Reunion' },
    { code: 'RO', label: 'Romania', phone: '40', value: 'Romania' },
    { code: 'RS', label: 'Serbia', phone: '381', value: 'Serbia' },
    { code: 'RU', label: 'Russian Federation', phone: '7', value: 'Russian Federation' },
    { code: 'RW', label: 'Rwanda', phone: '250', value: 'Rwanda' },
    { code: 'SA', label: 'Saudi Arabia', phone: '966', value: 'Saudi Arabia' },
    { code: 'SB', label: 'Solomon Islands', phone: '677', value: 'Solomon Islands' },
    { code: 'SC', label: 'Seychelles', phone: '248', value: 'Seychelles' },
    { code: 'SD', label: 'Sudan', phone: '249', value: 'Sudan' },
    { code: 'SE', label: 'Sweden', phone: '46', value: 'Sweden' },
    { code: 'SG', label: 'Singapore', phone: '65', value: 'Singapore' },
    { code: 'SH', label: 'Saint Helena', phone: '290', value: 'Saint Helena' },
    { code: 'SI', label: 'Slovenia', phone: '386', value: 'Slovenia' },
    { code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47', value: 'Svalbard and Jan Mayen' },
    { code: 'SK', label: 'Slovakia', phone: '421', value: 'Slovakia' },
    { code: 'SL', label: 'Sierra Leone', phone: '232', value: 'Sierra Leone' },
    { code: 'SM', label: 'San Marino', phone: '378', value: 'San Marino' },
    { code: 'SN', label: 'Senegal', phone: '221', value: 'Senegal' },
    { code: 'SO', label: 'Somalia', phone: '252', value: 'Somalia' },
    { code: 'SR', label: 'Suriname', phone: '597', value: 'Suriname' },
    { code: 'SS', label: 'South Sudan', phone: '211', value: 'South Sudan' },
    { code: 'ST', label: 'Sao Tome and Principe', phone: '239', value: 'Sao Tome and Principe' },
    { code: 'SV', label: 'El Salvador', phone: '503', value: 'El Salvador' },
    { code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721', value: 'Sint Maarten (Dutch part)' },
    { code: 'SY', label: 'Syrian Arab Republic', phone: '963', value: 'Syrian Arab Republic' },
    { code: 'SZ', label: 'Swaziland', phone: '268', value: 'Swaziland' },
    { code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649', value: 'Turks and Caicos Islands' },
    { code: 'TD', label: 'Chad', phone: '235', value: 'Chad' },
    { code: 'TF', label: 'French Southern Territories', phone: '262', value: 'French Southern Territories' },
    { code: 'TG', label: 'Togo', phone: '228', value: 'Togo' },
    { code: 'TH', label: 'Thailand', phone: '66', value: 'Thailand' },
    { code: 'TJ', label: 'Tajikistan', phone: '992', value: 'Tajikistan' },
    { code: 'TK', label: 'Tokelau', phone: '690', value: 'Tokelau' },
    { code: 'TL', label: 'Timor-Leste', phone: '670', value: 'Timor-Leste' },
    { code: 'TM', label: 'Turkmenistan', phone: '993', value: 'Turkmenistan' },
    { code: 'TN', label: 'Tunisia', phone: '216', value: 'Tunisia' },
    { code: 'TO', label: 'Tonga', phone: '676', value: 'Tonga' },
    { code: 'TR', label: 'Turkey', phone: '90', value: 'Turkey' },
    { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868', value: 'Trinidad and Tobago' },
    { code: 'TV', label: 'Tuvalu', phone: '688', value: 'Tuvalu' },
    { code: 'TW', label: 'Taiwan, Province of China', phone: '886', value: 'Taiwan, Province of China' },
    { code: 'TZ', label: 'United Republic of Tanzania', phone: '255', value: 'United Republic of Tanzania' },
    { code: 'UA', label: 'Ukraine', phone: '380', value: 'Ukraine' },
    { code: 'UG', label: 'Uganda', phone: '256', value: 'Uganda' },
    { code: 'US', label: 'United States', phone: '1', suggested: true, value: 'United States' },
    { code: 'UY', label: 'Uruguay', phone: '598', value: 'Uruguay' },
    { code: 'UZ', label: 'Uzbekistan', phone: '998', value: 'Uzbekistan' },
    { code: 'VA', label: 'Holy See (Vatican City State)', phone: '379', value: 'Holy See (Vatican City State)' },
    { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784', value: 'Saint Vincent and the Grenadines' },
    { code: 'VE', label: 'Venezuela', phone: '58', value: 'Venezuela' },
    { code: 'VG', label: 'British Virgin Islands', phone: '1-284', value: 'British Virgin Islands' },
    { code: 'VI', label: 'US Virgin Islands', phone: '1-340', value: 'US Virgin Islands' },
    { code: 'VN', label: 'Vietnam', phone: '84', value: 'Vietnam' },
    { code: 'VU', label: 'Vanuatu', phone: '678', value: 'Vanuatu' },
    { code: 'WF', label: 'Wallis and Futuna', phone: '681', value: 'Wallis and Futuna' },
    { code: 'WS', label: 'Samoa', phone: '685', value: 'Samoa' },
    { code: 'XK', label: 'Kosovo', phone: '383', value: 'Kosovo' },
    { code: 'YE', label: 'Yemen', phone: '967', value: 'Yemen' },
    { code: 'YT', label: 'Mayotte', phone: '262', value: 'Mayotte' },
    { code: 'ZA', label: 'South Africa', phone: '27', value: 'South Africa' },
    { code: 'ZM', label: 'Zambia', phone: '260', value: 'Zambia' },
    { code: 'ZW', label: 'Zimbabwe', phone: '263', value: 'Zimbabwe' },
];

function compare(a, b) {
    if (a.label < b.label) {
        return -1;
    }
    if (a.label > b.label) {
        return 1;
    }
    return 0;
}

const getCountries = () => {
    return countries.sort(compare);
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

const clearCookies = () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

const clearSingleCookie = (name) => {
    var d = new Date();
    d.setTime(d.getTime());
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + "" + ";domain=" + window.location.hostname + ";path=/;" + expires;
}

export const addDefaultSrc = (ev) => {
    ev.target.src = '/webapp/images/image-placeholder.jpg'
}

export const returnDefaultImage = (ev) => {
    return '/webapp/images/image-placeholder.jpg'
}

// Common function toggle
export default function useToggle(initialValue = false) {
    const [value,
        setValue] = React.useState(initialValue);
    const toggle = React.useCallback(() => {
        setValue(v => !v);
    }, []);
    return [value, toggle];
}

const scroolTop = () => {
    window.scrollTo(0, 0)
}
export {
    is_page_exist_private, is_page_exist_protected, clearSingleCookie, setCookie, getCookie,scroolTop,
    addBodyClass, is_page_exist_app, getCountries, replceMultiStringWithSIngle, clearCookies
}