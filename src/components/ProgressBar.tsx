import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
  style?: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = '#4ade80',
  backgroundColor = '#0f3460',
  height = 10,
  showLabel = false,
  label,
  style,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={[styles.container, style]}>
      {showLabel && label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.percentage}>{clampedProgress.toFixed(0)}%</Text>
        </View>
      )}
      <View style={[styles.progressBar, { backgroundColor, height }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: color,
              height: height,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  percentage: {
    color: '#e94560',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressBar: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 5,
  },
});

export default ProgressBar;
