/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-card border border-border rounded-2xl p-4 shadow-xl ${className}`}
    >
      {title && <h3 className="text-lg font-medium mb-4 text-text-primary">{title}</h3>}
      {children}
    </motion.div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isUp: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend }) => {
  return (
    <Card className="flex flex-row items-center gap-4 py-4">
      <div className="p-2 bg-background rounded-lg border border-border text-primary shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-text-secondary text-xs font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-text-primary">{value}</span>
          {trend && (
            <span className={`text-xs px-1.5 py-0.5 rounded-md ${trend.isUp ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
              {trend.isUp ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
