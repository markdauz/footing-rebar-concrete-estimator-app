import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import InputField from '../../components/InputField';
import ResultCard from '../../components/ResultCard';

import {
  computeOption,
  getCutSizeA,
  getCutSizeB,
  getTieWire,
  getVolume,
} from '../../utils/footingRebarCalculator';

export default function Footing() {
  const insets = useSafeAreaInsets();

  const DEFAULT_INPUT = {
    width: '0.8',
    length: '0.8',
    thickness: '0.3',
    diameter: '12',
    steelLength: '6',
    quantity: '1',
    barsW: '5',
    barsL: '5',
  };

  const [input, setInput] = useState(DEFAULT_INPUT);

  const handleChange = (field: string) => (value: string) => {
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setInput((prev) => ({ ...prev, [field]: value }));
    }
  };

  const cutSizeW_A = useMemo(() => getCutSizeA(input.width), [input.width]);
  const cutSizeL_A = useMemo(() => getCutSizeA(input.length), [input.length]);

  const cutSizeW_B = useMemo(
    () => getCutSizeB(input.width, input.diameter),
    [input.width, input.diameter],
  );

  const cutSizeL_B = useMemo(
    () => getCutSizeB(input.length, input.diameter),
    [input.length, input.diameter],
  );

  const optionA = useMemo(
    () => computeOption(cutSizeW_A, cutSizeL_A, input),
    [cutSizeW_A, cutSizeL_A, input],
  );

  const optionB = useMemo(
    () => computeOption(cutSizeW_B, cutSizeL_B, input),
    [cutSizeW_B, cutSizeL_B, input],
  );

  const tieWire = useMemo(() => getTieWire(input), [input]);
  const volume = useMemo(() => getVolume(input), [input]);

  const handleReset = () => setInput(DEFAULT_INPUT);

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: insets.top + 10,
            paddingHorizontal: 16,
            paddingBottom: 40,
          }}
        >
          {/* HEADER */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 2,
              }}
            >
              <Ionicons name="build-outline" size={26} color="#1e293b" />
            </View>

            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginTop: 10,
                color: '#1e293b',
              }}
            >
              Footing Rebar Calculator
            </Text>

            <Text
              style={{
                fontSize: 13,
                color: '#64748b',
                marginTop: 4,
              }}
            >
              Reinforcement estimation
            </Text>
          </View>

          {/* INPUT CARD */}
          <View style={styles.card}>
            <InputField
              label="Width (m)"
              value={input.width}
              onChange={handleChange('width')}
            />
            <InputField
              label="Length (m)"
              value={input.length}
              onChange={handleChange('length')}
            />
            <InputField
              label="Thickness (m)"
              value={input.thickness}
              onChange={handleChange('thickness')}
            />
            <InputField
              label="Bar Diameter"
              value={input.diameter}
              onChange={handleChange('diameter')}
            />
            <InputField
              label="Steel Length"
              value={input.steelLength}
              onChange={handleChange('steelLength')}
            />
            <InputField
              label="No. of Sets"
              value={input.quantity}
              onChange={handleChange('quantity')}
            />
            <InputField
              label="# Bars (W)"
              value={input.barsW}
              onChange={handleChange('barsW')}
            />
            <InputField
              label="# Bars (L)"
              value={input.barsL}
              onChange={handleChange('barsL')}
            />
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Volume</Text>
            <Text style={styles.resultValue}>{volume} m³</Text>
          </View>

          {/* RESULTS */}
          <ResultCard
            title="Option A"
            subtitle="w/o bend (75mm cover)"
            cutW={cutSizeW_A}
            cutL={cutSizeL_A}
            data={optionA}
            tieWire={tieWire}
            color="blue"
          />

          <View style={{ height: 12 }} />

          <ResultCard
            title="Option B"
            subtitle="w/ bend (75mm cover)"
            cutW={cutSizeW_B}
            cutL={cutSizeL_B}
            data={optionB}
            tieWire={tieWire}
            color="green"
          />

          {/* RESET */}
          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
  },

  resultCard: {
    backgroundColor: '#0f172a',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
  },

  resultTitle: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 6,
  },

  resultValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  reset: {
    marginTop: 18,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#475569',
  },

  resetText: {
    color: '#fff',
    fontWeight: '600',
  },
});
