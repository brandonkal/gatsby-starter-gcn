import React, { Component } from 'react'
import Helmet from 'react-helmet'
import config from '../utils/siteConfig'

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO } = this.props
    let title
    let description
    let image
    let postUrl
    if (postSEO) {
      title = postNode.title
      description =
        postNode.metaDescription === null
          ? postNode.body.childMarkdownRemark.excerpt
          : postNode.metaDescription
      image = 'https:' + postNode.heroImage.sizes.src
      postUrl = config.siteUrl + '/' + postPath + '/'
    } else {
      title = config.siteTitle
      description = config.siteDescription
      image = config.siteLogo
    }
    // Default Website Schema
    const schemaOrgJSONLD = [
      {
        '@context': 'http://schema.org',
        '@type': 'WebSite',
        url: config.siteUrl,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
      },
    ]
    if (postSEO) {
      schemaOrgJSONLD.push(
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': config.siteUrl,
                name: title,
              },
            },
          ],
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 2,
              item: {
                '@id': postUrl,
                name: title,
                image,
              },
            },
          ],
        },
        {
          // '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url: postUrl,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
            width: 1000,
            height: 563,
          },
          author: {
            '@type': 'Person',
            name: config.author,
            url: config.authorUrl,
          },
          publisher: {
            '@type': 'Organization',
            name: config.publisher,
            url: config.siteUrl,
          },
          datePublished: postNode.publishDateISO,
          mainEntityOfPage: postUrl,
        }
      )
    }
    // Page SEO Schema
    if (pageSEO) {
      schemaOrgJSONLD.push(
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': postUrl,
                name: title,
              },
            },
          ],
        },
        {
          '@type': 'WebPage',
          url: postUrl,
          name: title,
          description: description,
        }
      )
    }
    return (
      <Helmet>
        {/* General tags */}
        <meta name="image" content={image} />
        <meta name="description" content={description} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:title" content={title} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:url" content={postSEO ? postUrl : config.siteUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : ''}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:description" content={description} />
      </Helmet>
    )
  }
}

export default SEO
