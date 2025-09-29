import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MicrocontrollerSelector = ({ selectedBoard, onBoardSelect, boards }) => {
  return (
    <div className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border shadow-brand">
      <div className="flex items-center space-x-3 mb-5">
        <Icon name="Cpu" size={24} className="text-primary" />
        <h3 className="text-xl font-bold text-text-primary">Select Microcontroller</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {boards.map((board) => (
          <button
            key={board.id}
            onClick={() => onBoardSelect(board)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left transform hover:scale-105 hover:shadow-lg ${
              selectedBoard?.id === board.id
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-border hover:border-primary/50 bg-surface'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-background rounded-md flex items-center justify-center overflow-hidden border border-border">
                <Image 
                  src={board.image} 
                  alt={board.name}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary">{board.name}</h4>
                <p className="text-xs text-text-secondary">{board.specs}</p>
                <div className="flex items-center space-x-1.5 mt-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${
                    board.status === 'online' ? 'bg-success' : 'bg-warning'
                  }`}></div>
                  <span className="text-xs text-text-secondary capitalize font-medium">{board.status}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {selectedBoard && (
        <div className="mt-5 p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
          <div className="flex items-center space-x-3">
            <Icon name="CheckCircle" size={20} className="text-primary" />
            <div>
              <span className="text-sm font-semibold text-text-primary">Connected to {selectedBoard.name}</span>
              <p className="text-xs text-text-secondary mt-0.5">
                Ready for programming • {selectedBoard.specs} • Cloud-hosted hardware
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MicrocontrollerSelector;