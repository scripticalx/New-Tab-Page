import React, { useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import useLocalStorage from '../hooks/useLocalStorage';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableBookmarkItem = ({ bookmark, removeBookmark, getFavicon }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: bookmark.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="group relative flex flex-col items-center p-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-xl border border-white/5 hover:border-white/20 transition-all cursor-pointer select-none"
            onClick={() => window.location.href = bookmark.url}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    removeBookmark(bookmark.id);
                }}
                className="absolute top-1 right-1 p-1 text-white/0 group-hover:text-white/70 hover:text-red-400 transition-all"
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start when clicking delete
            >
                <Trash2 size={14} />
            </button>
            <img
                src={getFavicon(bookmark.url)}
                alt={bookmark.title}
                className="w-8 h-8 mb-3 rounded-full shadow-sm pointer-events-none"
                onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/32?text=?';
                }}
            />
            <span className="text-sm text-white/90 font-medium truncate w-full text-center pointer-events-none">
                {bookmark.title}
            </span>
        </div>
    );
};

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useLocalStorage('sora-bookmarks', [
        { id: 1, title: 'YukiList', url: 'https://yukilist.vercel.app/' },
        { id: 2, title: 'Sora-ich', url: 'https://sora-ich.vercel.app/' },
    ]);
    const [isAdding, setIsAdding] = useState(false);
    const [newBookmark, setNewBookmark] = useState({ title: '', url: '' });

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setBookmarks((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newBookmark.title || !newBookmark.url) return;

        let url = newBookmark.url;
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }

        setBookmarks([
            ...bookmarks,
            { id: Date.now(), title: newBookmark.title, url },
        ]);
        setNewBookmark({ title: '', url: '' });
        setIsAdding(false);
    };

    const removeBookmark = (id) => {
        setBookmarks(bookmarks.filter((b) => b.id !== id));
    };

    const getFavicon = (url) => {
        try {
            const domain = new URL(url).hostname;
            return `https://favicon.is/${domain}/`;
        } catch (e) {
            return '';
        }
    };

    return (
        <div className="mt-12 w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xl font-semibold text-white/90">Bookmarks</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                >
                    {isAdding ? <X size={20} /> : <Plus size={20} />}
                </button>
            </div>

            {isAdding && (
                <form
                    onSubmit={handleAdd}
                    className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 animate-fade-in"
                >
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newBookmark.title}
                            onChange={(e) =>
                                setNewBookmark({ ...newBookmark, title: e.target.value })
                            }
                            className="flex-1 px-4 py-2 bg-black/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
                        />
                        <input
                            type="text"
                            placeholder="URL"
                            value={newBookmark.url}
                            onChange={(e) =>
                                setNewBookmark({ ...newBookmark, url: e.target.value })
                            }
                            className="flex-1 px-4 py-2 bg-black/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </form>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={bookmarks.map((b) => b.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                        {bookmarks.map((bookmark) => (
                            <SortableBookmarkItem
                                key={bookmark.id}
                                bookmark={bookmark}
                                removeBookmark={removeBookmark}
                                getFavicon={getFavicon}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default Bookmarks;
