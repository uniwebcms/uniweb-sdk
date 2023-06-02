import React, { lazy, Suspense } from 'react';
import { website } from './index.js';

const Component = lazy(() =>
    website.getComponent('components', 'SimpleLink').catch(() => ({ default: () => null }))
);

export default function Link(props) {
    return (
        <Suspense fallback={''}>
            <Component {...props} />
        </Suspense>
    );
}

// const Link = lazy(() =>
//     website
//         .getComponent('components', 'SmartLink')
//         .then((module) => ({ default: module.Link }))
//         .catch(() => ({ default: () => null }))
// );

// export default (props) => {
//     const {
//         children,
//         target = '_self',
//         title = '',
//         style = null,
//         className = '',
//         to = '',
//         profile = null,
//         ariaLabel = '',
//         options = {}
//     } = props;

//     let anchorProps = {
//         className,
//         style
//     };

//     if (ariaLabel) {
//         anchorProps['aria-label'] = ariaLabel;
//     }

//     if (title) anchorProps.title = title;

//     let href = to;

//     if (profile) {
//         href = profile.makeProfileHref(options);
//     }

//     const domainsInfo = uniweb.activeWebsite.getDomainsInfo();
//     const base_route = domainsInfo?.base_route;

//     // Link from website to uniweb
//     if (base_route && href.indexOf('/') === 0) {
//         let appDomain = domainsInfo?.appDomain;
//         href = `${appDomain}${href}`;
//     }

//     const externalLink = href.includes('//');

//     if (externalLink) {
//         anchorProps = {
//             ...anchorProps,
//             target,
//             href
//         };

//         return <a {...anchorProps}>{children}</a>;
//     } else {
//         anchorProps = {
//             ...anchorProps,
//             target,
//             to: href
//         };
//     }

//     return (
//         <Suspense fallback={''}>
//             <Link {...anchorProps}>{children}</Link>
//         </Suspense>
//     );
// };