<?php

/**
 * Template Name: page Contact
 * Contact Page Template
 *
 **/

use Timber\Timber;

$context     = Timber::context();
$timber_post = Timber::get_post();
$context['post'] = $timber_post;

// fetch the ACF post object field containing the selected WPForms form
$form_object = get_field('formulaire', $timber_post->ID);
if ($form_object) {
    // WPForms stores forms as a custom post type; keep the object available to Twig
    $context['contact_form'] = $form_object;
}

// add a helper flag so Twig can conditionally call wpforms_display without parsing errors
$context['wpforms_available'] = function_exists('wpforms_display');

Timber::render('page-contact.twig', $context);
