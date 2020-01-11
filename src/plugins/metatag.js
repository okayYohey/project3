const TITLE = 'みんなのピラティス';

export function metatag(params) {
  const description = `descriptionを書くよ ${JSON.stringify(params)}`;
  return {
    title: TITLE,
    meta: [{
        name: 'description',
        content: description
      },
      {
        property: 'twitter:card',
        content: 'summary'
      },
      {
        property: 'twitter:title',
        content: document.title
      },
      {
        property: 'twitter:site',
        content: '@anonymous'
      },
      {
        property: 'twitter:creator',
        content: '@anonymous'
      },
      {
        property: 'twitter:description',
        content: description
      },
      {
        property: 'twitter:image',
        content: 'https://FQDN/favicon256.jpg',
      },
      {
        property: 'og:title',
        content: document.title
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: location.href
      },
      {
        property: 'og:image',
        content: 'https://FQDN/favicon256.jpg',
      },
    ],
    script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify(
        [{
            '@context': 'http://schema.org',
            '@type': 'Organization',
            'url': location.href,
            'logo': 'https://FQDN/favicon256.jpg',
          },
          {
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            'name': document.title,
            'alternateName': description,
            'url': location.href,
          },
        ], null, 2,
      ),
    }, ],
  };
}