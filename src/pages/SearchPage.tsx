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
  const [error, setError] = useState<Error | null>(null);

  // Fetch search results
  const fetchResults = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await dramaApi.search(query);
      const movies = response.searchCodeSearchResult.map(transformSearchResultToMovie);
      setResults(movies);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Gagal mencari drama'));
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

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
              {loading ? 'Mencari...' : `Menampilkan ${results.length} hasil untuk "${query}"`}
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
      </div>
    </main>
  );
};

export default SearchPage;
