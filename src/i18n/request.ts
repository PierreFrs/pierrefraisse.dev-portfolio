import { cookies } from 'next/headers';
import { headers } from 'next/headers';

export default async function getRequestConfig() {
    // Check for locale in cookie
    const cookieLocale = cookies().get('NEXT_LOCALE')?.value;

    // If no cookie, fallback to the Accept-Language header
    let detectedLocale: string | undefined = undefined;
    if (!cookieLocale) {
        const acceptLanguage = headers().get('accept-language');
        detectedLocale = acceptLanguage
            ?.split(',')
            .map((lang) => lang.split(';')[0].split('-')[0])
            .find((lang) => ['en', 'fr'].includes(lang));
    }

    const supportedLocales = ['en', 'fr'];
    const locale = supportedLocales.includes(cookieLocale || detectedLocale || 'en')
        ? cookieLocale || detectedLocale || 'en'
        : 'en'; // Default to 'en' if neither cookie nor header provides a valid locale

    const timeZoneMap: Record<string, string> = {
        en: 'America/New_York',
        fr: 'Europe/Paris',
    };

    // Ensure locale is a string for accessing the timeZoneMap
    const timeZone = timeZoneMap[locale as string] || 'UTC';

    const messages = (await import(`../../messages/${locale}.json`)).default;

    return {
        locale,
        messages,
        timeZone,
    };
}
