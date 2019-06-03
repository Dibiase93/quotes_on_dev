<?php
/**
 * The main template file.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php if ( have_posts() ) : ?>

			<?php if ( is_home() && ! is_front_page() ) : ?>
				<header>
					<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
				</header>
			<?php endif; ?>

			<?php /* Start the Loop */ ?>
			<?php while ( have_posts() ) : the_post(); ?>

				<?php get_template_part( 'template-parts/content' ); ?>

			<?php endwhile; ?>

			<?php the_posts_navigation(); ?>

		<?php else : ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

			<div class="entry-content">
				<?php the_excerpt(); ?>
			</div><!-- .entry-content -->

			<div class="entry-meta">
				<?php the_title('<h2 class="entry-title"> &mdash; ', '</h2>'); ?>

				<?php if($source && $source_url): ?>
					<span class="source"> 
						<a href="<?php echo $source_url; ?>">,
							<?php echo $source; ?>
						</a>
					</span>

				<?php elseif($source): ?>

					<span class="source">, <?php echo $source; ?> </span>

				<?php else: ?>

					<span class="source"> </span>

				<?php endif; ?>
			</div>

		</article><!-- #post-## -->

		<?php endif; ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>