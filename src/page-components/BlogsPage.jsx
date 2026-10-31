import React from 'react';
import TopBar from '@/app/components/TopBar';
import SiteFooter from '@/app/components/SiteFooter';
import BlogsHero from './BlogsHero';
import BlogsPromo from './BlogsPromo';
import BlogsTrending from './BlogsTrending';
import HomeDownload from './HomeDownload';
import BlogsArticles from './BlogsArticles';
import BlogsVideos from './BlogsVideos';
import BlogsSubscribe from './BlogsSubscribe';
import './HomeRedesign.css';
import './HomeDownload.css';
import './BlogsPage.css';

export default function BlogsPage() {
  return (
    <div className="bl">
      <div className="bl-top"><TopBar /><BlogsHero /></div>
      <main>
        <BlogsPromo />
        <BlogsTrending />
        <div className="home-redesign bl-dl-wrap"><HomeDownload light /></div> {/* same Download section as /features/ */}
        <BlogsArticles />
        <BlogsVideos />
        <BlogsSubscribe />
      </main>
      <SiteFooter />
    </div>
  );
}
