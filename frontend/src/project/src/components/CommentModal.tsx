import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceId: string;
  onSubmit: (comment: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-white mb-4">Ajouter un commentaire</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Partagez votre avis..."
            className="w-full h-32 bg-gray-700 text-white rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!comment.trim()}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;