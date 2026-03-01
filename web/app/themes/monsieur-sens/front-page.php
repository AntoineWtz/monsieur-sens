<?php

/**
 * Template Name: page Accueil
 * Front Page Template
 *
 **/

use Timber\Timber;

$context     = Timber::context();
$timber_post = Timber::get_post();
$context['post'] = $timber_post;

// fetch ACF fields for this page and expose them to Twig via context
if (function_exists('get_field')) {
    $context['hero_accueil'] = get_field('hero_accueil', $timber_post->ID) ?: [];
    $context['bloc_choisir'] = get_field('bloc_choisir', $timber_post->ID) ?: [];
    $context['bloc_histoire'] = get_field('bloc_histoire', $timber_post->ID) ?: [];
    $context['bloc_engagements'] = get_field('bloc_engagements', $timber_post->ID) ?: [];
    $context['bloc_contact'] = get_field('bloc_contact', $timber_post->ID) ?: [];
    $context['bloc_galerie'] = get_field('bloc_galerie', $timber_post->ID) ?: [];
} else {
    $context['hero_accueil'] = [];
    $context['bloc_choisir'] = [];
    $context['bloc_histoire'] = [];
    $context['bloc_engagements'] = [];
    $context['bloc_contact'] = [];
    $context['bloc_galerie'] = [];
}

// prepare suggestions list with optional section slug for anchor links
if (function_exists('get_field')) {
    $raw = get_field('bloc_suggestions', $timber_post->ID);
    $processed = [];
    if (is_array($raw)) {
        foreach ($raw as $item) {
            $slug = '';
            // allow explicit section field or derive from title if needed
            if (!empty($item['section'])) {
                $slug = sanitize_title($item['section']);
            } elseif (!empty($item['titre_suggestion'])) {
                // fallback - not ideal but avoids empty anchor
                $slug = sanitize_title($item['titre_suggestion']);
            }
            $item['slug'] = $slug;
            $processed[] = $item;
        }
    }
    $context['suggestions'] = $processed;
} else {
    $context['suggestions'] = [];
}

// url to the suggestions page for constructing links
$context['suggestions_page_url'] = get_permalink(get_page_by_path('suggestions'));

Timber::render('front-page.twig', $context);
