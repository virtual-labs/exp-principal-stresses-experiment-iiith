### What is Measured?

The experiment begins with the given state of plane stress:

- Normal stress along the $x$-direction, $\sigma_x$
- Normal stress along the $y$-direction, $\sigma_y$
- Shear stress, $\tau_{xy}$

Using these values, the experiment determines:

- Principal stresses
- Principal plane angle
- Maximum shear stress
- Tresca equivalent stress
- Von Mises equivalent stress

### Why are the Calculations Required?

These calculations help engineers:

- Identify the maximum and minimum normal stresses acting on a component.
- Determine the orientation of the critical planes.
- Evaluate the likelihood of yielding.
- Compare different failure theories for ductile materials.
- Design structural and machine components safely.

### Observation Table

| Parameter                    | Symbol       | Unit   |
| ---------------------------- | ------------ | ------ |
| Normal stress in x-direction | $\sigma_x$   | MPa    |
| Normal stress in y-direction | $\sigma_y$   | MPa    |
| Shear stress                 | $\tau_{xy}$  | MPa    |
| Principal stress             | $\sigma_1$   | MPa    |
| Principal stress             | $\sigma_2$   | MPa    |
| Principal plane angle        | $\theta_p$   | degree |
| Maximum shear stress         | $\tau_{max}$ | MPa    |
| Von Mises stress             | $\sigma_v$   | MPa    |
| Tresca stress                | $\sigma_T$   | MPa    |

### Sequential Calculations

Compute the average normal stress

$$
\sigma_{avg}
=
\frac{\sigma_x+\sigma_y}{2}
$$

Compute the radius

$$
R
=
\sqrt{
\left(
\frac{\sigma_x-\sigma_y}{2}
\right)^2
+
\tau_{xy}^{\,2}
}
$$

Principal stresses

$$
\sigma_1=\sigma_{avg}+R
$$

$$
\sigma_2=\sigma_{avg}-R
$$

Principal plane angle

$$
\tan2\theta_p
=
\frac{2\tau_{xy}}
{\sigma_x-\sigma_y}
$$

Maximum shear stress

$$
\tau_{max}=R
$$

Von Mises stress

$$
\sigma_v
=
\sqrt{
\sigma_x^2+\sigma_y^2-\sigma_x\sigma_y+3\tau_{xy}^{\,2}
}
$$

Tresca stress

$$
\sigma_T=\sigma_1-\sigma_2
$$

### Solved Numerical Example

Given

- $\sigma_x=100$ MPa
- $\sigma_y=40$ MPa
- $\tau_{xy}=30$ MPa

Average stress

$$
\sigma_{avg}
=
\frac{100+40}{2}
=
70\text{ MPa}
$$

Radius

$$
R
=
\sqrt{30^2+30^2}
=
42.43\text{ MPa}
$$

Principal stresses

$$
\sigma_1=70+42.43=112.43\text{ MPa}
$$

$$
\sigma_2=70-42.43=27.57\text{ MPa}
$$

Maximum shear stress

$$
\tau_{max}=42.43\text{ MPa}
$$

Von Mises stress

$$
\sigma_v
=
\sqrt{100^2+40^2-100(40)+3(30)^2}
=
105.36\text{ MPa}
$$

### Interpretation of Results

- Larger principal stress indicates the most critical tensile stress.
- Maximum shear stress is used in the Tresca criterion.
- Von Mises stress predicts yielding based on distortion energy.
- If the equivalent stress exceeds the material yield strength, yielding is expected.

### Result

The experiment determines the principal stresses, principal plane orientation, maximum shear stress, and compares the Tresca and Von Mises failure criteria to evaluate the safety of a component subjected to plane stress.
