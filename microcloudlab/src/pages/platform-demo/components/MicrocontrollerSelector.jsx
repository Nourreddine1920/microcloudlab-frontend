import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MicrocontrollerSelector = ({ selectedBoard, onBoardSelect, boards }) => {
  return (
    <div className="bg-surface rounded-lg p-4 border border-border">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Cpu" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Select Microcontroller</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {boards.map((board) => (
          <button
            key={board.id}
            onClick={() => onBoardSelect(board)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedBoard?.id === board.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50 hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center overflow-hidden">
                <Image 
                  src={board.image} 
                  alt={board.name}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-text-primary text-sm">{board.name}</h4>
                <p className="text-xs text-text-secondary">{board.specs}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className={`w-2 h-2 rounded-full ${
                    board.status === 'online' ? 'bg-success' : 'bg-warning'
                  }`}></div>
                  <span className="text-xs text-text-secondary capitalize">{board.status}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {selectedBoard && (
        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-text-primary">Connected to {selectedBoard.name}</span>
          </div>
          <p className="text-xs text-text-secondary">
            Ready for programming • {selectedBoard.specs} • Cloud-hosted hardware
          </p>
        </div>
      )}
    </div>
  );
};

export default MicrocontrollerSelector;