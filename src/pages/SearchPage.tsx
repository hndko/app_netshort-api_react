import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '@/src/components/MovieCard';
import { dramaApi } from '@/src/api/dramaApi';
import { Movie, transformSearchResultToMovie } from '@/src/types';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch search results
  const fetchResults = useCallback(async (pageNum: number, append: boolean = false) => {
    if (!query.trim()) {
      setResults([]);
      setTotal(0);
      setHasMore(false);
      return;
    }

    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
      setResults([]);
    }
    setError(null);

    try {
      const response = await dramaApi.search(query, pageNum);
      const newMovies = response.searchCodeSearchResult.map(transformSearchResultToMovie);

      if (append) {
        setResults(prev => [...prev, ...newMovies]);
      } else {
        setResults(newMovies);
        setTotal(response.total);
      }

      // Check if there are more results
      setHasMore(newMovies.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Gagal mencari drama'));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [query]);

  // Initial fetch when query changes
  useEffect(() => {
    setPage(1);
    fetchResults(1, false);
  }, [query]);

  // Load more results
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(nextPage, true);
  };

  return (
    <main className="relative z-10 pt-20 pb-20 bg-background-light dark:bg-background-dark transition-colors duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Hasil Pencarian
          </h1>
          {query && (
            <p className="text-gray-600 dark:text-gray-400">
              {loading ? 'Mencari...' : `Menampilkan ${results.length} dari ${total} hasil untuk "${query}"`}
            </p>
          )}
        </div>

        {/* No Query State */}
        {!query && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Masukkan kata kunci untuk mencari drama
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-400">Mencari drama...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="font-medium">Gagal mencari</p>
            <p className="text-sm">{error.message}</p>
          </div>
        )}

        {/* No Results */}
        {!loading && query && results.length === 0 && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😢</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Tidak ada drama yang ditemukan untuk "{query}"
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && hasMore && results.length > 0 && results.length < total && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-primary hover:bg-rose-600 disabled:bg-gray-400 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-primary/30"
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

        {/* End of Results */}
        {!loading && results.length > 0 && results.length >= total && (
          <div className="text-center mt-12 text-gray-500 dark:text-gray-400">
            Sudah menampilkan semua hasil pencarian
          </div>
        )}
      </div>
    </main>
  );
};

export default SearchPage;
