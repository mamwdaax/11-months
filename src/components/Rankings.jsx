import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import nishyAnimeData from '../nishy_anime_data.json';

function SortableItem({ id, item, index, disabled }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderRadius: '12px',
        marginBottom: '1rem',
        background: isDragging ? 'rgba(44, 62, 80, 0.9)' : 'var(--card-bg)',
        boxShadow: isDragging ? '0 12px 32px rgba(0,0,0,0.3)' : 'none',
        cursor: disabled ? 'default' : 'grab',
        opacity: disabled ? 0.9 : 1
      }}>
        {!disabled && (
          <div style={{ padding: '0 1rem', color: 'var(--text-secondary)' }} {...attributes} {...listeners}>
            <GripVertical size={20} />
          </div>
        )}
        <div style={{ 
          width: '30px', 
          height: '30px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginRight: '1rem',
          fontWeight: 'bold',
          color: 'var(--accent-primary)'
        }}>
          {index + 1}
        </div>
        <img 
          src={item.image} 
          alt={item.title} 
          style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', marginRight: '1rem' }} 
        />
        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h4>
      </div>
    </div>
  );
}

export default function Rankings() {
  const nishyList = nishyAnimeData; // Already in Nishy's perfect order
  const [jaanList, setJaanList] = useState([]);
  const [isCompared, setIsCompared] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem('jaan_tierlist');
    if (saved) {
      setJaanList(JSON.parse(saved));
    } else {
      // Initialize with Nishy's list but shuffled or just the default so she can reorder it
      setJaanList([...nishyList]);
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setJaanList((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        localStorage.setItem('jaan_tierlist', JSON.stringify(newItems));
        return newItems;
      });
    }
  };

  const handleCompare = () => {
    setIsCompared(true);
  };

  const calculateSimilarity = () => {
    let matches = 0;
    for (let i = 0; i < nishyList.length; i++) {
      if (jaanList[i] && jaanList[i].id === nishyList[i].id) {
        matches++;
      }
    }
    return Math.round((matches / nishyList.length) * 100);
  };

  const renderMessage = (percentage) => {
    if (percentage < 40) {
      return "We have always enjoyed different aspects of life and it is no different when it comes to our taste in art. This significant difference is what makes being with you so exciting, you bring in a point of view different from mine and help me see things in ways that I couldn't have myself.";
    } else if (percentage < 80) {
      return "I love how refreshingly unique and yet similar we are. Each of us has our own interpretations for the same things, yet we find enjoyment in true art and things which are crafted with love.";
    } else {
      return "The two of us have always had a lot in common when it comes to our appreciation of things, and I am glad that it is reflected through this tier list too. You and I have always had a great understanding at things which makes me feel as though I do not need to even communicate things to you any longer, and that my precious would understand things because she knows what I think like.";
    }
  };

  if (jaanList.length === 0) return null;

  const percentage = calculateSimilarity();

  return (
    <section style={{ padding: '6rem 2rem', maxWidth: isCompared ? '1400px' : '800px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h2 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
          color: 'var(--accent-secondary)',
          marginBottom: '1rem' 
        }}>
          Our Tier List
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Rank the anime we've watched together to see how our tastes align.
        </p>
      </motion.div>

      {isCompared && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="glass" 
          style={{ padding: '2rem', borderRadius: '24px', marginBottom: '4rem', textAlign: 'center' }}
        >
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--accent-primary)' }}>
            Similarity: {percentage}%
          </h3>
          <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: '2rem' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ height: '100%', background: 'var(--accent-primary)' }}
            />
          </div>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-primary)', fontStyle: 'italic', maxWidth: '800px', margin: '0 auto' }}>
            "{renderMessage(percentage)}"
          </p>
        </motion.div>
      )}

      <div style={{ display: 'flex', gap: '3rem', flexWrap: isCompared ? 'wrap' : 'nowrap', justifyContent: 'center' }}>
        {/* Jaan's List */}
        <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
            Jaan's List
          </h3>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={jaanList} strategy={verticalListSortingStrategy}>
              {jaanList.map((item, index) => (
                <SortableItem key={item.id} id={item.id} item={item} index={index} disabled={isCompared} />
              ))}
            </SortableContext>
          </DndContext>
        </div>

        {/* Nishy's List */}
        {isCompared && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ flex: '1 1 400px', maxWidth: '600px' }}
          >
            <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', color: 'var(--accent-primary)' }}>
              Nishy's List
            </h3>
            {nishyList.map((item, index) => {
              // Highlight matches
              const isMatch = jaanList[index] && jaanList[index].id === item.id;
              return (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  borderRadius: '12px',
                  marginBottom: '1rem',
                  background: isMatch ? 'rgba(229, 192, 123, 0.15)' : 'var(--card-bg)',
                  border: isMatch ? '1px solid rgba(229, 192, 123, 0.4)' : '1px solid transparent',
                }}>
                  <div style={{ 
                    width: '30px', 
                    height: '30px', 
                    background: isMatch ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', 
                    color: isMatch ? '#1c2329' : 'var(--accent-primary)',
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginRight: '1rem',
                    fontWeight: 'bold'
                  }}>
                    {index + 1}
                  </div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover', marginRight: '1rem' }} 
                  />
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h4>
                  {isMatch && <span style={{ marginLeft: 'auto', color: 'var(--accent-primary)', fontWeight: 'bold' }}>Match!</span>}
                </div>
              );
            })}
          </motion.div>
        )}
      </div>

      {!isCompared && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button
            onClick={handleCompare}
            className="glass"
            style={{
              padding: '1rem 3rem',
              fontSize: '1.2rem',
              color: '#1c2329',
              background: 'var(--accent-primary)',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Compare With Nishy
          </button>
        </div>
      )}
    </section>
  );
}
