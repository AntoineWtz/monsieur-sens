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

Timber::render('page-contact.twig', $context);
