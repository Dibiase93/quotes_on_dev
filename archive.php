<?php
/**
 * The template for displaying archive pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>



	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">



		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<?php
					the_archive_title( '<h1 class="page-title">', '</h1>' );
				?>
			</header><!-- .page-header -->

			<?php /* Start the Loop */ ?>					
			
		

			<?php while ( have_posts() ) : the_post(); ?>


			<ul class="archive-list">
						 <?php
                         $posts = get_posts(array(
							 'posts_per_page'=> 5,
							 'post_type'=>'post',
							 ‘post__not_in’=> $ids,
							));
                         foreach($posts as $post): setup_postdata($post);
						 ?>
                         <li class="archive-list-item">
							 
						 <?php
							get_template_part( 'template-parts/content' );
						?>
						
						</li>
						
						<?php endforeach; wp_reset_postdata(); ?>
					 </ul>
					
					
						<?php endwhile; ?>

			<?php qod_numbered_pagination(); ?>
		    

		<?php else : ?>

			<?php get_template_part( 'template-parts/content', 'none' ); ?>

		<?php endif; ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
