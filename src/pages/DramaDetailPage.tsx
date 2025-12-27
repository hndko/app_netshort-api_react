import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dramaApi } from '@/src/api/dramaApi';
import { DramaDetailResponse, Episode } from '@/src/types';
import Icon from '@/src/components/Icon';

const DramaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [drama, setDrama] = useState<DramaDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  const fetchDrama = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await dramaApi.getAllEpisodes(id);
      setDrama(response);
      // Auto-select first episode
      if (response.shortPlayEpisodeInfos.length > 0) {
        setSelectedEpisode(response.shortPlayEpisodeInfos[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Gagal memuat drama'));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDrama();
  }, [fetchDrama]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-20 pb-20">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-4 text-gray-600 dark:text-gray-400">Memuat drama...</span>
        </div>
      </main>
    );
  }

  if (error || !drama) {
    return (
      <main className="min-h-screen bg-background-light dark:bg-background-dark pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            <p className="font-medium">Gagal memuat drama</p>
            <p className="text-sm">{error?.message}</p>
            <Link to="/" className="mt-4 inline-block text-primary hover:underline">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Video Player Section */}
      <div className="relative bg-black">
        {selectedEpisode ? (
          <div className="aspect-video max-h-[70vh] mx-auto">
            <video
              key={selectedEpisode.episodeId}
              src={selectedEpisode.playVoucher}
              poster={selectedEpisode.episodeCover}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="aspect-video max-h-[70vh] flex items-center justify-center bg-gray-900">
            <img src={drama.shortPlayCover} alt={drama.shortPlayName} className="h-full object-contain" />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Drama Info */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <img
            src={drama.shortPlayCover}
            alt={drama.shortPlayName}
            className="w-40 h-60 object-cover rounded-lg shadow-lg hidden md:block"
          />
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {drama.shortPlayName}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {drama.shortPlayLabels.map((label, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mb-4">
              <span className="flex items-center gap-1">
                <Icon name="movie" size="sm" />
                {drama.totalEpisode} Episode
              </span>
              <span className="flex items-center gap-1">
                <Icon name="check_circle" size="sm" />
                {drama.isFinish ? 'Selesai' : 'Ongoing'}
              </span>
              {drama.scriptName && (
                <span className="px-2 py-0.5 bg-orange-500 text-white rounded text-xs">
                  {drama.scriptName}
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
              {drama.shotIntroduce}
            </p>
          </div>
        </div>

        {/* Episode List */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Daftar Episode ({drama.shortPlayEpisodeInfos.length})
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {drama.shortPlayEpisodeInfos.map((episode) => (
              <button
                key={episode.episodeId}
                onClick={() => !episode.isLock && setSelectedEpisode(episode)}
                disabled={episode.isLock}
                className={`relative aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                  ${selectedEpisode?.episodeId === episode.episodeId
                    ? 'bg-primary text-white'
                    : episode.isLock
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary/20'
                  }`}
              >
                {episode.isLock && (
                  <Icon name="lock" size="xs" className="absolute top-1 right-1 text-gray-400" />
                )}
                {episode.episodeNo}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Episode Info */}
        {selectedEpisode && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Episode {selectedEpisode.episodeNo}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Icon name="favorite" size="sm" className="text-red-500" />
                  {selectedEpisode.likeNums}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="visibility" size="sm" />
                  {selectedEpisode.chaseNums}
                </span>
                <span className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs">
                  {selectedEpisode.playClarity}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DramaDetailPage;
