/* Content for "Equation Balancer". Write equations unbalanced, with -> for the arrow.
 * The page works out the answer itself, so only the equation is needed.
 * level: 1 easy, 2 medium, 3 hard.
 */
window.EQUATIONS = [
  { id: 'h2o', level: 1, name: 'Hydrogen burns in oxygen', eq: 'H2 + O2 -> H2O' },
  { id: 'mgo', level: 1, name: 'Burning magnesium', eq: 'Mg + O2 -> MgO' },
  { id: 'nacl', level: 1, name: 'Making table salt', eq: 'Na + Cl2 -> NaCl' },
  { id: 'cuo', level: 1, name: 'Heating copper in air', eq: 'Cu + O2 -> CuO' },
  { id: 'mghcl', level: 1, name: 'Magnesium + hydrochloric acid', eq: 'Mg + HCl -> MgCl2 + H2' },
  { id: 'znhcl', level: 1, name: 'Zinc + hydrochloric acid', eq: 'Zn + HCl -> ZnCl2 + H2' },
  { id: 'hcl', level: 1, name: 'Making hydrogen chloride', eq: 'H2 + Cl2 -> HCl' },
  { id: 'nh3', level: 1, name: 'Haber process', eq: 'N2 + H2 -> NH3' },
  { id: 'cao', level: 1, name: 'Burning calcium', eq: 'Ca + O2 -> CaO' },
  { id: 'kcl', level: 1, name: 'Potassium + chlorine', eq: 'K + Cl2 -> KCl' },
  { id: 'ch4', level: 2, name: 'Burning methane (natural gas)', eq: 'CH4 + O2 -> CO2 + H2O' },
  { id: 'nawater', level: 2, name: 'Sodium in water', eq: 'Na + H2O -> NaOH + H2' },
  { id: 'kwater', level: 2, name: 'Potassium in water', eq: 'K + H2O -> KOH + H2' },
  { id: 'h2o2', level: 2, name: 'Decomposing hydrogen peroxide', eq: 'H2O2 -> H2O + O2' },
  { id: 'alcl3', level: 2, name: 'Aluminium + chlorine', eq: 'Al + Cl2 -> AlCl3' },
  { id: 'fecl3', level: 2, name: 'Iron + chlorine', eq: 'Fe + Cl2 -> FeCl3' },
  { id: 'caoh2', level: 2, name: 'Neutralisation: calcium hydroxide', eq: 'Ca(OH)2 + HCl -> CaCl2 + H2O' },
  { id: 'naoh', level: 2, name: 'Neutralisation: sulfuric acid', eq: 'NaOH + H2SO4 -> Na2SO4 + H2O' },
  { id: 'li2o', level: 2, name: 'Burning lithium', eq: 'Li + O2 -> Li2O' },
  { id: 'caco3', level: 2, name: 'Marble chips + acid', eq: 'CaCO3 + HCl -> CaCl2 + H2O + CO2' },
  { id: 'fe2o3', level: 3, name: 'Iron rusting (simplified)', eq: 'Fe + O2 -> Fe2O3' },
  { id: 'al2o3', level: 3, name: 'Burning aluminium', eq: 'Al + O2 -> Al2O3' },
  { id: 'c3h8', level: 3, name: 'Burning propane', eq: 'C3H8 + O2 -> CO2 + H2O' },
  { id: 'blast', level: 3, name: 'Blast furnace', eq: 'Fe2O3 + CO -> Fe + CO2' },
  { id: 'c2h6', level: 3, name: 'Burning ethane', eq: 'C2H6 + O2 -> CO2 + H2O' },
  { id: 'thermite', level: 3, name: 'Thermite-style displacement', eq: 'Al + CuO -> Al2O3 + Cu' },
  { id: 'ethanol', level: 3, name: 'Burning ethanol', eq: 'C2H5OH + O2 -> CO2 + H2O' },
  { id: 'fe2o3c', level: 3, name: 'Reducing iron oxide with carbon', eq: 'Fe2O3 + C -> Fe + CO2' },
  { id: 'nh3o2', level: 3, name: 'Oxidising ammonia', eq: 'NH3 + O2 -> NO + H2O' }
];
