import type { MarkdownHeading } from 'astro';
import { FunctionalComponent, render } from 'preact';
import { unescape } from 'html-escaper';
import { useState, useEffect, useRef } from 'preact/hooks';

type ItemOffsets = {
    id: string;
    topOffset: number;
};

const TableOfContents: FunctionalComponent<{ headings: MarkdownHeading[] }> = ({
    headings = [],
}) => {
    const toc = useRef<HTMLUListElement>();
    const onThisPageID = 'on-this-page-heading';
    const itemOffsets = useRef<ItemOffsets[]>([]);
    const [currentID, setCurrentID] = useState('overview');
    useEffect(() => {
        const getItemOffsets = () => {
            const titles = document.querySelectorAll('article :is(h1, h2, h3, h4)');
            itemOffsets.current = Array.from(titles).map((title) => ({
                id: title.id,
                topOffset: title.getBoundingClientRect().top + window.scrollY,
            }));
        };

        getItemOffsets();
        window.addEventListener('resize', getItemOffsets);

        return () => {
            window.removeEventListener('resize', getItemOffsets);
        };
        }, []);

    useEffect(() => {
        if (!toc.current) return;

        const setCurrent: IntersectionObserverCallback = (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const { id } = entry.target;
                    if (id === onThisPageID) continue;
                    setCurrentID(entry.target.id);
                    break;
                }
            }
        };

        const observerOptions: IntersectionObserverInit = {
            // Negative top margin accounts for `scroll-margin`.
            // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
            rootMargin: '-100px 0% -66%',
            threshold: 1,
        };

        const headingsObserver = new IntersectionObserver(setCurrent, observerOptions);

        // Observe all the headings in the main page content.
        document.querySelectorAll('article :is(h1,h2,h3)').forEach((h) => headingsObserver.observe(h));

        // Stop observing when the component is unmounted.
        return () => headingsObserver.disconnect();
        }, [toc.current]);

    const onLinkClick = (e) => {
        setCurrentID(e.target.getAttribute('href').replace('#', ''));
    };

    const renderDepth = (heading) => {
        let padding = 0;

        if (heading.depth == 3) {
            padding = 4;
        } else if (heading.depth == 4) {
            padding = 8;
        }
        
        return (
            <>
                <a href={`#${heading.slug}`} onClick={onLinkClick} class={`mx-${padding} text-gray-300 border-white border-b hover:border-b-2`}>
                    {unescape(heading.text)}
                </a>
            </>
        )
    }

    return (
        <>
            <div class="flex items-center justify-center w-full py-2">
                <h2 id={onThisPageID} className="heading">Table of Content</h2>
            </div>
            <hr class="h-px border-0 bg-gradient-to-r from-transparent via-dark-100 to-transparent" />
            <ul ref={toc} class="leading-loose mx-4">
                {headings
                    .filter(({ depth }) => depth > 1 && depth < 5)
                    .map((heading) => (
                        <li
                            className={`header-link depth-${heading.depth} ${
currentID === heading.slug ? 'current-header-link' : ''
} my`.trim()}
                            >
                            {renderDepth(heading)}
                        </li>
                ))}
            </ul>
        </>
    );
};

export default TableOfContents;
