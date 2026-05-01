import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <LinearGradient colors={['#bae6fd', '#7dd3fc']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        >
          <Text style={{ color: '#334155', fontSize: 20, marginBottom: 12 }}>
            Footing Rebar Calculator
          </Text>

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

          {/* Volume */}
          <View
            style={{
              backgroundColor: '#E0F2FE',
              padding: 12,
              borderRadius: 12,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: '#0369A1' }}>Volume (m³)</Text>
            <Text style={{ color: '#0C4A6E', fontSize: 18, fontWeight: '600' }}>
              {volume}
            </Text>
          </View>

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

          <TouchableOpacity
            onPress={handleReset}
            style={{
              marginTop: 20,
              backgroundColor: '#475569',
              padding: 14,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff' }}>Reset</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
};
