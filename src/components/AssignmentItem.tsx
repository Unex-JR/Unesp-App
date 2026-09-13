import { View, Text } from "react-native";
import { colors, typography } from "@/theme";
import { FileText } from "lucide-react-native";

import { StyleSheet } from "react-native";


type AssignmentItemProps = {
    title: string;
    subject: string;
    deadline: string;
};

export function AssignmentItem({ title, subject, deadline }: AssignmentItemProps ){
  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>

        <View style={styles.iconContainer}>
            <FileText size={20} color={colors.primaryBlue} />
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          <Text style={styles.subject} numberOfLines={1} ellipsizeMode="tail">{subject}</Text>
        </View>
      </View>

      <View style={styles.tag}>
        <Text style={styles.tagText}>{deadline}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  subject: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xxs,
    color: colors.textSecondary,
    marginTop: 0,
  },
  tag: {
    backgroundColor: '#FFE5E5', 
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  tagText: {
    fontFamily: typography.fontFamily.semibold,
    fontSize: typography.fontSize.xxs,
    color: '#D32F2F',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    minWidth: 0,
  },
  iconContainer: {
    backgroundColor: '#E0F2FE',
    padding: 8,
    borderRadius: 8,
    flexShrink: 0,
   },
});