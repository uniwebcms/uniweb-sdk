import React, { useCallback, useEffect, useState } from 'react';
import { Profile } from './index';

const Image = (props) => {
    const { contentType = 'docufolio', contentId, value, alt = '', className = 'w-full h-full object-cover', filePreview = false, externalSrc = '' } = props;

    const profile = Profile.newProfile(contentType, contentId);

    const { href, src, altText } = profile.getAssetInfo(value, filePreview, alt);

    const [imgSrc, setImgSrc] = useState(src);
    const [isFallback, setIsFallback] = useState(false);

    useEffect(() => {
        setImgSrc(src);
        setIsFallback(false);
    }, [src]);

    const fetchImgSrc = useCallback(() => {
        fetch(href)
            .then((res) => res.json())
            .then((res) => {
                setIsFallback(true);
                setImgSrc(res);
            });
    }, [href]);

    return (
        <img
            src={externalSrc || imgSrc}
            className={className}
            alt={altText}
            onError={(event) => {
                if (Profile.editableMode() && !isFallback) fetchImgSrc();
            }}
        />
    );
};

export default function DocumentImage(props) {
    const { value } = props;

    if (!value) return null;

    return <Image {...props}></Image>;
}

/**
 * 
    // let finalType = contentType === 'resources' ? 'equipment' : contentType;

    // const [version, identifier, filename] = value.split('/');

    // const ext = filename.split('.').pop();

    // const previewMode = filePreview && !['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext);

    // const assetRootUrl = website.getAssetRootUrl();

    // const src = `${assetRootUrl}${finalType}/${viewType}/${contentId}/${previewMode ? `${identifier}_preview` : identifier}_v${version}.${previewMode ? 'webp' : ext}`;

    // const altText = website.localize(alt) || filename;

    // const href = website.buildLoadProfileAssetURL(contentId, contentType, value, viewType, identifier);
 */
