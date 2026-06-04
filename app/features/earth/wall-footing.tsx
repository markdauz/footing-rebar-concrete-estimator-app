import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function WallFooting() {
  const insets = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [excavationHeight, setExcavationHeight] = useState('');
  const [footingWidth, setFootingWidth] = useState('');
  const [footingLength, setFootingLength] = useState('');
  const [footingThickness, setFootingThickness] = useState('');
  const [numberOfWallFooting, setNumberOfWallFooting] = useState('');
  const [wallWidth, setWallWidth] = useState('');
  const [wallLength, setWallLength] = useState('');

  const gravelBed = 0.1;

  const handleNumberInput = (
    value: string,
    setter: (value: string) => void,
  ) => {
    const sanitized = value.replace(/[^0-9.]/g, '');

    const parts = sanitized.split('.');

    if (parts.length > 2) {
      return;
    }

    setter(sanitized);
  };

  const totalExcavation = useMemo(() => {
    const excavationHeightValue = parseFloat(excavationHeight || '0') || 0;

    const footingWidthValue = parseFloat(footingWidth || '0') || 0;

    const footingLengthValue = parseFloat(footingLength || '0') || 0;

    const wallFootingValue = parseFloat(numberOfWallFooting || '0') || 0;

    if (!wallFootingValue) {
      return 0;
    }

    return (
      wallFootingValue *
      (excavationHeightValue * footingWidthValue * footingLengthValue +
        footingWidthValue * footingLengthValue * gravelBed)
    );
  }, [excavationHeight, footingWidth, footingLength, numberOfWallFooting]);

  const totalBackfill = useMemo(() => {
    const excavationHeightValue = parseFloat(excavationHeight || '0') || 0;

    const footingWidthValue = parseFloat(footingWidth || '0') || 0;

    const footingLengthValue = parseFloat(footingLength || '0') || 0;

    const footingThicknessValue = parseFloat(footingThickness || '0') || 0;

    const wallFootingValue = parseFloat(numberOfWallFooting || '0') || 0;

    const wallWidthValue = parseFloat(wallWidth || '0') || 0;

    return (
      totalExcavation -
      wallFootingValue *
        (wallWidthValue *
          footingLengthValue *
          (excavationHeightValue - footingThicknessValue)) -
      footingWidthValue *
        footingLengthValue *
        footingThicknessValue *
        wallFootingValue
    );
  }, [
    totalExcavation,
    excavationHeight,
    footingWidth,
    footingLength,
    footingThickness,
    numberOfWallFooting,
    wallWidth,
  ]);

  useEffect(() => {
    const hasRequiredValues =
      excavationHeight &&
      footingWidth &&
      footingLength &&
      footingThickness &&
      numberOfWallFooting &&
      wallWidth;

    if (!hasRequiredValues) {
      setShowResults(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setShowResults(false);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [
    excavationHeight,
    footingWidth,
    footingLength,
    footingThickness,
    numberOfWallFooting,
    wallWidth,
  ]);

  const reset = () => {
    setExcavationHeight('');
    setFootingWidth('');
    setFootingLength('');
    setFootingThickness('');
    setNumberOfWallFooting('');
    setWallWidth('');
    setWallLength('');

    setShowResults(false);
    setIsLoading(false);
  };

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          <View style={styles.header}>
            <View style={styles.iconBox}>
              <Ionicons name="remove-outline" size={26} color="#1e293b" />
            </View>

            <Text style={styles.title}>Wall Footing Earthwork</Text>

            <Text style={styles.subtitle}>Excavation Volume Calculator</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Excavation Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Excavation Height (m)</Text>

              <TextInput
                value={excavationHeight}
                onChangeText={(v) => handleNumberInput(v, setExcavationHeight)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <Text style={styles.sectionTitle}>Wall Footing (m)</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Width (m)</Text>

              <TextInput
                value={footingWidth}
                onChangeText={(v) => handleNumberInput(v, setFootingWidth)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Length (m)</Text>

              <TextInput
                value={footingLength}
                onChangeText={(v) => handleNumberInput(v, setFootingLength)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Thickness (m)</Text>

              <TextInput
                value={footingThickness}
                onChangeText={(v) => handleNumberInput(v, setFootingThickness)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>No. of Wall Footing</Text>

              <TextInput
                value={numberOfWallFooting}
                onChangeText={(v) =>
                  handleNumberInput(v, setNumberOfWallFooting)
                }
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <Text style={styles.sectionTitle}>Wall Dimensions</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Width (x)</Text>

              <TextInput
                value={wallWidth}
                onChangeText={(v) => handleNumberInput(v, setWallWidth)}
                keyboardType="decimal-pad"
                style={styles.input}
                placeholder="Enter value"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Length (y)</Text>

              <View style={styles.autoValueBox}>
                <Text style={styles.autoValueText}>
                  {footingLength || 'Auto Computed'}
                </Text>
              </View>
            </View>

            <View style={styles.infoBox}>
              <Ionicons
                name="information-circle-outline"
                size={18}
                color="#2563eb"
              />

              <Text style={styles.infoText}>Gravel bed is fixed to 0.1m.</Text>
            </View>

            <TouchableOpacity style={styles.reset} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#2563eb" />
              <Text style={styles.loaderText}>Calculating...</Text>
            </View>
          )}

          {showResults && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Computed Quantity</Text>

              <Result
                label="Total Excavation"
                value={`${totalExcavation.toFixed(3)} m³`}
              />

              <Result
                label="Total Backfill"
                value={`${totalBackfill.toFixed(3)} m³`}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>

      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 10,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },

  inputGroup: {
    marginBottom: 16,
  },

  label: {
    color: '#334155',
    marginBottom: 6,
    fontSize: 13,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    fontWeight: '600',
    color: '#0f172a',
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 18,
    color: '#1e40af',
  },

  reset: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#475569',
  },

  resetText: {
    color: '#fff',
    fontWeight: '600',
  },

  resultCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
  },

  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#e2e8f0',
  },

  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },

  resultLabel: {
    color: '#94a3b8',
  },

  resultValue: {
    fontWeight: '700',
    color: '#fff',
    fontSize: 15,
  },
  autoValueBox: {
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },

  autoValueText: {
    fontWeight: '600',
    color: '#334155',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },

  loaderText: {
    marginTop: 10,
    color: '#64748b',
    fontSize: 14,
  },
});
