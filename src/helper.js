import { useState, useEffect } from 'react';
import { Profile } from './index';

/**
 * Strip html string uses regular expressions;
 * Remove all HTML tags from an HTML string and returns a plain string
 * @param {string} htmlString
 * @returns {string} plainString
 */
function stripHTMLTags(htmlString) {
    if (!htmlString || typeof htmlString !== 'string') return '';

    // Remove HTML tags using regular expression
    const plainString = htmlString.replace(/<[^>]*>/g, '');

    // Decode HTML entities
    const decodedString = new DOMParser().parseFromString(plainString, 'text/html').body
        .textContent;

    return decodedString;
}

/**
 * Create a React state-effect combo to trigger the initialization of a profile
 * so that all of its data can be accessed via the at() method.
 *
 * @param {Profile} profile
 * @returns {bool}
 */
const useLoadProfileBody = (profile) => profile.useReadyStateEffect(useState, useEffect);

/**
 * Create a React state-effect combo to trigger the initialization of a profile
 * so that all of its data can be accessed via the at() method.
 *
 * @param {string} profileType - A profile object or a profile type string.
 * @param {int|string} contentId - The ID of the profile if profileOrType is a string.
 * Otherwise, it must be empty.
 * @returns {Profile|false} Returns the profile object once it is in a complete (ready) state.
 * Returns false while the profile data is being fetched.
 */
const useGetProfile = (profileType, contentId) =>
    Profile.useCompleteProfile(useState, useEffect, profileType, contentId);

/**
 * Filter linked profiles.
 *
 * @param {Profile} profile
 * @param {string} profileType
 * @param {string|null} sectionName
 * @param {string|null} fieldName
 * @returns {bool}
 */
const useLinkedProfileFilterState = function (profile, profileType, sectionName, fieldName) {
    return profile.useLinkedProfileFilterState(useState, profileType, sectionName, fieldName);
};

/**
 *
 * @param {Object} block
 */
const parseBlockLinks = (block) => {};

export {
    stripHTMLTags,
    useLinkedProfileFilterState,
    useGetProfile,
    useLoadProfileBody,
    parseBlockLinks
};
