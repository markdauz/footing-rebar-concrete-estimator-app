import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import InputField from '../../../components/InputField';
import ResultCard from '../../../components/ResultCard';

import {
  computeOption,
  getCutSizeA,
  getCutSizeB,
  getTieWire,
  getVolume,
} from '../../../utils/footingRebarCalculator';

type OptionValue = 'A' | 'B';

type Item<T> = {
  label: string;
  value: T;
};

const isAndroid = Platform.OS === 'android';

export default function Footing() {
  const insets = useSafeAreaInsets();

  const EMPTY_INPUT = {
    width: '',
    length: '',
    thickness: '',
    diameter: '',
    steelLength: '',
    quantity: '',
    barsW: '',
    barsL: '',
  };

  const [input, setInput] = useState(EMPTY_INPUT);

  const [selectedOption, setSelectedOption] = useState<OptionValue | null>(
    null,
  );

  const [openOption, setOpenOption] = useState(false);

  const optionItems: Item<OptionValue>[] = [
    { label: 'Without Bend', value: 'A' },
    { label: 'With Bend', value: 'B' },
  ];

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

  const handleReset = () => {
    setInput(EMPTY_INPUT);
    setSelectedOption(null);
  };

  function renderAndroidModal<T>(
    visible: boolean,
    setVisible: (v: boolean) => void,
    items: Item<T>[],
    onSelect: (value: T) => void,
  ) {
    return (
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.modalOverlay, { paddingTop: insets.top + 80 }]}
          onPress={() => setVisible(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalCard}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.handle} />

            <ScrollView showsVerticalScrollIndicator={false}>
              {items.map((item) => (
                <TouchableOpacity
                  key={String(item.value)}
                  style={styles.modalItem}
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }

  return (
    <LinearGradient colors={['#f1f5f9', '#e2e8f0']} style={{ flex: 1 }}>
      <Stack.Screen
        options={{ headerShown: true, title: '', headerTransparent: true }}
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
              <Ionicons name="layers-outline" size={26} color="#1e293b" />
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
              Steel Bars and Tie Wires
            </Text>
          </View>

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

            <Text style={styles.label}>Select Option</Text>

            {isAndroid ? (
              <>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setOpenOption(true)}
                >
                  <Text>
                    {selectedOption
                      ? optionItems.find((i) => i.value === selectedOption)
                          ?.label
                      : 'Select option'}
                  </Text>
                </TouchableOpacity>

                {renderAndroidModal(
                  openOption,
                  setOpenOption,
                  optionItems,
                  setSelectedOption,
                )}
              </>
            ) : (
              <View style={{ zIndex: 3000 }}>
                <DropDownPicker
                  open={openOption}
                  value={selectedOption}
                  items={optionItems}
                  setOpen={setOpenOption}
                  setValue={setSelectedOption}
                  listMode="SCROLLVIEW"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Volume</Text>

            <Text style={styles.resultValue}>
              {volume ? `${volume} m³` : '-'}
            </Text>
          </View>

          {selectedOption === 'A' && (
            <ResultCard
              title="Without Bend"
              subtitle="w/o bend (75mm cover)"
              cutW={cutSizeW_A}
              cutL={cutSizeL_A}
              data={optionA}
              tieWire={tieWire}
              color="blue"
            />
          )}

          {selectedOption === 'B' && (
            <ResultCard
              title="With Bend"
              subtitle="w/ bend (75mm cover)"
              cutW={cutSizeW_B}
              cutL={cutSizeL_B}
              data={optionB}
              tieWire={tieWire}
              color="green"
            />
          )}

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

  label: {
    marginTop: 12,
    marginBottom: 6,
    fontWeight: '600',
    color: '#334155',
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },

  dropdown: {
    borderRadius: 12,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
    minHeight: 50,
  },

  dropdownContainer: {
    borderColor: '#cbd5e1',
    borderRadius: 12,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },

  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    maxHeight: 350,
  },

  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#cbd5e1',
    alignSelf: 'center',
    marginBottom: 10,
  },

  modalItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },

  modalText: {
    fontSize: 15,
    color: '#0f172a',
  },

  modalCancel: {
    textAlign: 'center',
    marginTop: 12,
    color: '#ef4444',
    fontWeight: '600',
  },
});
