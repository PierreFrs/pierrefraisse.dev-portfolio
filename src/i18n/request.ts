import { cookies } from 'next/headers';

export default async function getRequestConfig() {
    const cookieLocale = cookies().get('NEXT_LOCALE')?.value ?? 'en'; // Default to 'en'

    const supportedLocales = ['en', 'fr'];
    const locale = supportedLocales.includes(cookieLocale) ? cookieLocale : 'en';

    const timeZoneMap: Record<string, string> = {
        en: 'America/New_York',
        fr: 'Europe/Paris'
    };

    const timeZone = timeZoneMap[locale] || 'UTC';

    const messages = (await import(`../../messages/${locale}.json`)).default;

    return {
        locale,
        messages,
        timeZone
    };
}
