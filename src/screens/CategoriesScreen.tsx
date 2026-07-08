import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useGame } from '../context/GameContext';
import Mascot from '../components/Mascot';
import Card from '../components/Card';
import type { RootStackParamList } from '../navigation/AppNavigator';

interface ExamCategory {
  id: string;
  title: string;
  titleEN: string;
  icon: string;
  description: string;
  questionCount: number;
  passingScore: number;
  color: string;
  gradient: string[];
  topics: string[];
}

const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'analytical',
    title: 'ความสามารถในการคิดวิเคราะห์',
    titleEN: 'Analytical & Critical Thinking',
    icon: '🧠',
    description: 'วัดการคิดคำนวณและภาษาไทย',
    questionCount: 50,
    passingScore: 60,
    color: '#6366f1',
    gradient: ['#6366f1', '#8b5cf6'],
    topics: ['อนุกรม', 'คณิตศาสตร์', 'ตรรกะ', 'เงื่อนไขสัญลักษณ์', 'อุปมาอุปไมย'],
  },
  {
    id: 'english',
    title: 'ภาษาอังกฤษ',
    titleEN: 'English Language',
    icon: '🌐',
    description: 'วัดแกรมม่า คำศัพท์ บทสนทนา และการอ่าน',
    questionCount: 25,
    passingScore: 60,
    color: '#06b6d4',
    gradient: ['#06b6d4', '#3b82f6'],
    topics: ['Grammar', 'Vocabulary', 'Conversation', 'Reading Comprehension'],
  },
  {
    id: 'ethics',
    title: 'ความรู้และลักษณะการเป็นข้าราชการที่ดี',
    titleEN: 'Ethics & Public Service Knowledge',
    icon: '⚖️',
    description: 'วัดความรู้ด้านกฎหมาย กฎระเบียบ และจริยธรรม',
    questionCount: 25,
    passingScore: 60,
    color: '#f59e0b',
    gradient: ['#f59e0b', '#ef4444'],
    topics: ['กฎหมาย', 'ระเบียบ', 'จริยธรรม', 'จรรยาบรรณ', 'การบริการประชาชน'],
  },
];

type NavigationProp = StackNavigationProp<RootStackParamList>;

const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { player } = useGame();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Navigate to level map filtered by category
    navigation.navigate('LevelMap', { categoryId });
  };

  const getTotalProgress = () => {
    const totalQuestions = EXAM_CATEGORIES.reduce((sum, cat) => sum + cat.questionCount, 0);
    const completedQuestions = player.completedLevels?.length || 0;
    return Math.round((completedQuestions / totalQuestions) * 100);
  };

  return (
    <View style={styles.container}>
      {/* Gradient Header */}
      <LinearGradient
        colors={['rgba(132, 204, 22, 0.15)', 'rgba(30, 41, 59, 0.95)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleSection}>
            <Text style={styles.titleIcon}>📚</Text>
            <View style={styles.titleTexts}>
              <Text style={styles.mainTitle}>ข้อสอบ ก.พ.</Text>
              <Text style={styles.subtitle}>Civil Service Examination</Text>
            </View>
          </View>
          
          <View style={styles.progressSection}>
            <View style={styles.progressRing}>
              <Text style={styles.progressPercent}>{getTotalProgress()}%</Text>
            </View>
            <Text style={styles.progressLabel}>ความก้าวหน้า</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Mascot Introduction */}
      <View style={styles.mascotSection}>
        <Mascot 
          emotion="thinking" 
          size="medium"
          message="เลือกหมวดหมู่ข้อสอบที่ต้องการฝึกฝน!"
        />
      </View>

      {/* Category Cards */}
      <ScrollView
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>หมวดหมู่ข้อสอบ</Text>
        <Text style={styles.sectionDescription}>
          ข้อสอบ ก.พ. ภาค ก. มีทั้งหมด 3 วิชา รวม 100 ข้อ
        </Text>

        {EXAM_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => handleSelectCategory(category.id)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={category.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.categoryCard}
            >
              <View style={styles.categoryContent}>
                {/* Left: Icon & Basic Info */}
                <View style={styles.categoryLeft}>
                  <View style={[styles.iconBox, { backgroundColor: `${category.color}30` }]}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                  </View>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryTitleEN}>{category.titleEN}</Text>
                    <Text style={styles.categoryDescription}>{category.description}</Text>
                  </View>
                </View>

                {/* Right: Stats */}
                <View style={styles.categoryRight}>
                  <View style={styles.statBox}>
                    <Text style={styles.statIcon}>📝</Text>
                    <Text style={styles.statValue}>{category.questionCount}</Text>
                    <Text style={styles.statLabel}>ข้อ</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statIcon}>✅</Text>
                    <Text style={styles.statValue}>{category.passingScore}%</Text>
                    <Text style={styles.statLabel}>ผ่าน</Text>
                  </View>
                </View>
              </View>

              {/* Topics Preview */}
              <View style={styles.topicsSection}>
                <Text style={styles.topicsLabel}>หัวข้อที่ออกสอบ:</Text>
                <View style={styles.topicsList}>
                  {category.topics.map((topic, index) => (
                    <View key={index} style={styles.topicBadge}>
                      <Text style={styles.topicText}>{topic}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Arrow Indicator */}
              <View style={styles.arrowIndicator}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* Info Card */}
        <Card variant="primary" style={styles.infoCard}>
          <View style={styles.infoContent}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <View style={styles.infoTexts}>
              <Text style={styles.infoTitle}>เกณฑ์การผ่าน</Text>
              <Text style={styles.infoDescription}>
                ผู้สมัครระดับปริญญาตรีต้องได้คะแนนรวมไม่ต่ำกว่า 60%{'\n'}
                ระดับปริญญาโทต้องได้คะแนนไม่ต่ำกว่า 65%
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleIcon: {
    fontSize: 36,
  },
  titleTexts: {
    gap: 4,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  progressSection: {
    alignItems: 'center',
    gap: 6,
  },
  progressRing: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(132, 204, 22, 0.2)',
    borderWidth: 2,
    borderColor: '#84CC16',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#84CC16',
  },
  progressLabel: {
    fontSize: 10,
    color: '#94a3b8',
  },
  mascotSection: {
    padding: 20,
    alignItems: 'center',
  },
  categoriesScroll: {
    flex: 1,
  },
  categoriesContent: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 20,
  },
  categoryCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
    position: 'relative',
  },
  categoryContent: {
    flexDirection: 'row',
    gap: 16,
  },
  categoryLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryInfo: {
    flex: 1,
    gap: 4,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  categoryTitleEN: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  categoryDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  categoryRight: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 18,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  topicsSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    gap: 8,
  },
  topicsLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
  },
  topicsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  topicText: {
    fontSize: 11,
    color: '#ffffff',
  },
  arrowIndicator: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  arrowText: {
    fontSize: 24,
    color: '#84CC16',
    fontWeight: 'bold',
  },
  infoCard: {
    marginTop: 8,
  },
  infoContent: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 32,
  },
  infoTexts: {
    flex: 1,
    gap: 4,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  infoDescription: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
});

export default CategoriesScreen;
