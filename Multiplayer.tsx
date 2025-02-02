import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Swords, Crown, Share2 } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import type { MultiplayerMatch } from '../types';

export default function Multiplayer() {
  const user = useAuthStore((state) => state.user);
  const [availableMatches, setAvailableMatches] = useState<MultiplayerMatch[]>([]);
  const { createMultiplayerMatch, joinMultiplayerMatch, multiplayerMatch } = useGameStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data } = await supabase
        .from('multiplayer_matches')
        .select(`
          *,
          match_participants (
            user_id,
            points
          )
        `)
        .eq('status', 'waiting');

      if (data) {
        setAvailableMatches(data);
      }
      setLoading(false);
    };

    fetchMatches();

    const subscription = supabase
      .channel('multiplayer_matches')
      .on('*', () => {
        fetchMatches();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleCreateMatch = async () => {
    try {
      await createMultiplayerMatch();
    } catch (error) {
      console.error('Failed to create match:', error);
    }
  };

  const handleJoinMatch = async (matchId: string) => {
    try {
      await joinMultiplayerMatch(matchId);
    } catch (error) {
      console.error('Failed to join match:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Multiplayer Battles</h1>
            <p className="text-gray-600">Challenge other players in real-time quiz battles</p>
          </div>

          {multiplayerMatch ? (
            <div className="text-center">
              <div className="bg-purple-50 p-6 rounded-lg mb-6">
                <Swords className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                <h2 className="text-lg font-semibold mb-2">Battle Room</h2>
                <p className="text-gray-600 mb-4">Share this code with your opponent:</p>
                <div className="flex items-center justify-center gap-2">
                  <code className="bg-white px-4 py-2 rounded-lg font-mono">
                    {multiplayerMatch.id}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(multiplayerMatch.id)}
                    className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    <Share2 className="w-5 h-5 text-purple-500" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600">
                Waiting for opponent to join...
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-8">
                <button
                  onClick={handleCreateMatch}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Create New Battle
                </button>
              </div>

              <h2 className="text-xl font-semibold mb-4">Available Battles</h2>
              <div className="space-y-4">
                {availableMatches.map((match) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4 hover:border-purple-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Battle #{match.id.slice(0, 8)}</h3>
                        <p className="text-sm text-gray-600">
                          {match.participants.length} player(s) waiting
                        </p>
                      </div>
                      <button
                        onClick={() => handleJoinMatch(match.id)}
                        className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 transition-colors"
                      >
                        Join Battle
                      </button>
                    </div>
                  </motion.div>
                ))}

                {availableMatches.length === 0 && (
                  <p className="text-center text-gray-600">
                    No battles available. Create one to start playing!
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}