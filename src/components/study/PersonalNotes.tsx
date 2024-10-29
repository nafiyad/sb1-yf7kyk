import React, { useState } from 'react';
import { useStudyStore } from '../../store/studyStore';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Save } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const PersonalNotes = () => {
  const { personalNotes, addPersonalNote, deletePersonalNote, updatePersonalNote } = useStudyStore();
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      addPersonalNote(newNote.trim());
      setNewNote('');
    }
  };

  const handleStartEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleSaveEdit = (id: string) => {
    if (editContent.trim()) {
      updatePersonalNote(id, editContent.trim());
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
          placeholder="Add a personal note..."
          className="flex-1 bg-[#1f2437] rounded-lg px-4 py-2 text-sm
                   placeholder-white/40 focus:outline-none focus:ring-2
                   focus:ring-blue-500/50 border border-white/5"
        />
        <button
          onClick={handleAddNote}
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg
                   transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {personalNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#1f2437] rounded-lg p-4 border border-white/5"
          >
            {editingId === note.id ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="flex-1 bg-[#2a3147] rounded-lg px-3 py-1.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveEdit(note.id)}
                  className="p-1.5 bg-green-500 hover:bg-green-600 rounded-lg
                           transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="text-sm text-white/90">{note.content}</p>
                  <p className="text-xs text-white/40 mt-1">
                    {formatDistanceToNow(note.timestamp, { addSuffix: true })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartEdit(note.id, note.content)}
                    className="p-1.5 hover:bg-white/10 rounded-lg
                             transition-colors duration-200"
                  >
                    <Edit2 className="w-4 h-4 text-white/60" />
                  </button>
                  <button
                    onClick={() => deletePersonalNote(note.id)}
                    className="p-1.5 hover:bg-white/10 rounded-lg
                             transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4 text-white/60" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PersonalNotes;