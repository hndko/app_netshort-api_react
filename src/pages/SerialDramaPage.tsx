import React, { useState, useEffect, useCallback } from 'react';
import Section from '@/src/components/Section';
import { dramaApi } from '@/src/api/dramaApi';
import { SectionData, transformDramaToMovie, ForYouResponse } from '@/src/types';

const SerialDramaPage: React.FC = () => {
  const [sections, setSections] = useState<SectionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = useCallback(async (pageNum: number, append: boolean = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const forYou = await dramaApi.getForYou(pageNum);

      const newSection: SectionData = {
        title: pageNum === 1 ? 'Semua Serial Drama' : `Halaman ${pageNum}`,
        items: forYou.contentInfos.map(transformDramaToMovie),
        layout: 'grid',
        showViewAll: false,
      };

      if (append) {
        setSections(prev => [...prev, newSection]);
      } else {
        setSections([newSection]);
      }

      setHasMore(!forYou.completed);
      setLoading(false);
      setLoadingMore(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch'));
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, true);
    }
  };

  return (
    <main className="relative z-10 pt-20 pb-20 space-y-12 bg-background-light dark:bg-background-dark transition-colors duration-300 min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Serial Drama</h1>
        <p className="text-gray-600 dark:text-gray-400">Temukan drama-drama seru dan menarik untuk kamu</p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-4 text-gray-600 dark:text-gray-400">Memuat drama...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="font-medium">Gagal memuat data</p>
            <p className="text-sm">{error.message}</p>
          </div>
        </div>
      )}

      {/* Sections */}
      {!loading && sections.map((section, index) => (
        <Section key={`foryou-${index}`} {...section} />
      ))}

      {/* Load More Button */}
      {!loading && hasMore && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-primary hover:bg-rose-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors"
          >
            {loadingMore ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Memuat...
              </>
            ) : (
              'Muat Lebih Banyak'
            )}
          </button>
        </div>
      )}
    </main>
  );
};

export default SerialDramaPage;
